import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { UserModel } from "../../models/user.model";
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, } from '@angular/fire/firestore';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

// Firebase

@Component({
  selector: 'app-createprofile',
  templateUrl: './createprofile.page.html',
  styleUrls: ['./createprofile.page.scss'],
})
export class CreateprofilePage implements OnInit {
  accountCreationForm: FormGroup;
  agentAccountCreationForm: FormGroup;
  submitted = false;
  submittedAgent = false;
  colorControl = new FormControl('primary');
  fontSizeControl = new FormControl(11, Validators.min(10));
  disablePhoneNumber = true;
  submitBtn = false;
  agentSubmitBtn = false;
  segmentModel = "admin";

  get firstname() {
    return this.accountCreationForm.get("firstname");
  }

  get lastname() {
    return this.accountCreationForm.get("lastname");
  }

  get gender() {
    return this.accountCreationForm.get("gender");
  }

  get email() {
    return this.accountCreationForm.get("email");
  }

  get phoneNumber() {
    return this.accountCreationForm.get("phoneNumber");
  }

  get nrc() {
    return this.accountCreationForm.get("nrc");
  }



  get agentFirstname() {
    return this.agentAccountCreationForm.get("firstname");
  }

  get agentLastname() {
    return this.agentAccountCreationForm.get("lastname");
  }

  get agentGender() {
    return this.agentAccountCreationForm.get("gender");
  }

  get agentEmail() {
    return this.agentAccountCreationForm.get("email");
  }

  get agentPhoneNumber() {
    return this.agentAccountCreationForm.get("phoneNumber");
  }

  get agentNRC() {
    return this.agentAccountCreationForm.get("nrc");
  }


  constructor(
    private formBuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private auth: AuthService,
    public toastController: ToastController,
    private loadingController: LoadingController,
    private modalController: ModalController,

  ) {
    this.accountCreationForm = this.formBuilder.group({
      gender: ['', Validators.required],
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^([a-zA-Z]+?)([-\s'][a-zA-Z]+)*?$")]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^([a-zA-Z]+?)([-\s'][a-zA-Z]+)*?$")]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(13), Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$")]],
      nrc: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    });

    this.agentAccountCreationForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^([a-zA-Z]+?)([-\s'][a-zA-Z]+)*?$")]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^([a-zA-Z]+?)([-\s'][a-zA-Z]+)*?$")]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(13), Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$")]],
      nrc: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    });

    setTimeout(() => {
      if (this.auth.isNewUser === false) {
        this.auth.router.navigate(['/admin']);
        window.location.reload();
      }
    }, 1000);
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {

      if (user) {
        this.accountCreationForm.controls["phoneNumber"].setValue(user?.phoneNumber);
        this.agentAccountCreationForm.controls["phoneNumber"].setValue(user?.phoneNumber);

        if (user.phoneNumber !== null && user.phoneNumber !== "") {
          this.disablePhoneNumber = true;
        } else {
          this.disablePhoneNumber = false;
        }
        var n = this.auth.isNewUser;
        if (!n) {
          this.auth.ngZone.run(() => {
            this.auth.router.navigate(['/admin']);
          });
        }
      }
    });
  }

  getFontSize() {
    return Math.max(10, this.fontSizeControl.value);
  }

  public onSubmitted() {
    this.submitted = true;
    if (!this.accountCreationForm.valid) {
      this.presentToast('Please provide all the required values!')
      return false;
    } else {
      this.uploadData(this.auth.userData);
    }
  }


  public onSubmittedAgent() {
    this.submittedAgent = true;
    if (!this.agentAccountCreationForm.valid) {
      this.presentToast('Please provide all the required values!')
      return false;
    } else {
      this.uploadAgentData(this.auth.userData);
    }
  }

  async uploadAgentData(user: { uid: any; }) {
    this.submitBtn = true;
    const userRef: AngularFirestoreDocument<UserModel> = this.afs.doc(`users/${user.uid}`);
    const data = {
      email: this.agentAccountCreationForm.controls["email"].value,
      phoneNumber: this.agentAccountCreationForm.controls["phoneNumber"].value,
      nrc: this.agentAccountCreationForm.controls["nrc"].value,
      firstname: this.agentAccountCreationForm.controls["firstname"].value,
      lastname: this.agentAccountCreationForm.controls["lastname"].value,
      isNew: false,
      role: "admin"
    }

    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();


    return userRef.set(data, { merge: true }).then((res) => {
      this.auth.ngZone.run(() => {
        this.modalController.dismiss();
        loading.dismiss();
        this.auth.router.navigate(['/admin']);
        window.location.reload();
      });
    }).catch((err) => {
      this.submitBtn = false;
      loading.dismiss();
    });
  }

  async uploadData(user: { uid: any; }) {
    this.submitBtn = true;
    const userRef: AngularFirestoreDocument<UserModel> = this.afs.doc(`users/${user.uid}`);
    const data = {
      email: this.accountCreationForm.controls["email"].value,
      phoneNumber: this.accountCreationForm.controls["phoneNumber"].value,
      nrc: this.accountCreationForm.controls["nrc"].value,
      gender: this.accountCreationForm.controls["gender"].value,
      firstname: this.accountCreationForm.controls["firstname"].value,
      lastname: this.accountCreationForm.controls["lastname"].value,
      isNew: false,
      role: "client",
      loanCount: 0,
      loanAmount: 0,
      interestRate: 15,
    }
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();


    return userRef.set(data, { merge: true }).then((res) => {
      this.auth.ngZone.run(() => {
        this.modalController.dismiss();
        loading.dismiss();
        this.auth.router.navigate(['/admin']);
        window.location.reload();
      });
    }).catch((err) => {
      this.submitBtn = false;
      loading.dismiss();
    });
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  get errorControl() {
    return this.accountCreationForm.controls;
  }


  get agentErrorControl() {
    return this.agentAccountCreationForm.controls;
  }

  segmentChanged(event){
    console.log(this.segmentModel);

    console.log(event);
  }
}

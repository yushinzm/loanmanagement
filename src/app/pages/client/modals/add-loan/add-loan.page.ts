import { AgentsService } from 'src/app/services/agents.service';
import { ClientsService } from 'src/app/services/clients.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastController, LoadingController, ModalController } from '@ionic/angular';
import { UserModel } from 'src/app/models/user.model';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { LoanModel } from 'src/app/models/loan.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-loan',
  templateUrl: './add-loan.page.html',
  styleUrls: ['./add-loan.page.scss'],
})
export class AddLoanPage implements OnInit {

  approvalForm: FormGroup;
  submitted = false;
  colorControl = new FormControl('primary');
  fontSizeControl = new FormControl(11, Validators.min(10));
  submitBtn = false;

  get loanAmount() {
    return this.approvalForm.get("loanAmount");
  }

  constructor(
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private cService: ClientsService,
    private auth: AuthService,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
  ) {
    var pattern = "/\d+/g";

    this.approvalForm = this.formBuilder.group({
      loanAmount: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]\d*$/)]],
    });
  }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }
  getFontSize() {
    return Math.max(10, this.fontSizeControl.value);
  }

  public onSubmitted() {
    this.submitted = true;
    if (!this.approvalForm.valid) {
      this.presentToast('Please provide all the required values!')
      return false;
    } else {
      this.uploadClientData();
    }
  }


  async uploadClientData() {
    this.submitBtn = true;
    var user = this.auth.authUserData;

    var interestAmount = 0.15 * parseInt(this.approvalForm.controls['loanAmount'].value);
    var principalAmount = parseInt(this.approvalForm.controls['loanAmount'].value);
    var total = principalAmount + interestAmount;

    const loanRef: AngularFirestoreDocument<LoanModel> = this.afs.collection('loans').doc();




    if (principalAmount > user.loanAmount) {
      return this.presentToast(`Your maximum loan amount is ${user.loanAmount}!`)
    }

    const data = {
      uidOwner: user.uid,
      email: user.email,
      phoneNumber: user.phoneNumber,
      nrc: user.nrc,
      firstname: user.firstname,
      lastname: user.lastname,
      interestAmount: interestAmount,
      principalAmount: principalAmount,
      interestRate: 15,
      dateCreated: firebase.default.firestore.FieldValue.serverTimestamp(),
      status: "pending",
      approvedBy: "",
      total: total,
    }


    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();

    return loanRef.set(data, { merge: true }).then((res) => {
      this.modalController.dismiss();
      loading.dismiss();
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
    return this.approvalForm.controls;
  }
}

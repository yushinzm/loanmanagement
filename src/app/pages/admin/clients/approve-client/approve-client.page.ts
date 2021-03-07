import { ClientsService } from 'src/app/services/clients.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastController, LoadingController, ModalController } from '@ionic/angular';
import { UserModel } from 'src/app/models/user.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-approve-client',
  templateUrl: './approve-client.page.html',
  styleUrls: ['./approve-client.page.scss'],
})
export class ApproveClientPage implements OnInit {
  @Input() accountData: UserModel;
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
  ) {
    var pattern ="/\d+/g";

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
    this.cService.enableAccount(this.accountData, this.approvalForm.controls["loanAmount"].value);
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

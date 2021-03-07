import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoanModel } from '../models/loan.model';
import { UserModel } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsLoansService {

  loanCollection: AngularFirestoreCollection<LoanModel>;
  loanItem: Observable<LoanModel[]>;
  authUserData: UserModel;
  constructor(
    private afs: AngularFirestore,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private auth: AuthService,

  ) {
    this.loansInitialization("all");
  }

  loansInitialization(condition: string) {

    var user = this.auth.userData;
    if (condition === "pending") {
      this.loanCollection = this.afs.collection('loans', ref => ref.where('status', '==', "pending"));
    } else if (condition === "rejected") {
      this.loanCollection = this.afs.collection('loans', ref => ref.where('status', '==', "rejected"));
    } else if (condition === "confirmed") {
      this.loanCollection = this.afs.collection('loans', ref => ref.where('status', '==', "approved"));
    } else {
      this.loanCollection = this.afs.collection('loans');
    }
    this.loanItem = this.loanCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as LoanModel;
        const uid = a.payload.doc.id;
        let date = moment().format('MM/DD/YYYY HH:MM:SS');
        if (data.dateCreated != null) {
           date = moment(data.dateCreated.toDate()).format('MM/DD/YYYY HH:MM:SS');
        }
        return { uid, date, ...data };
      }))
    );
  }

  selectAllConfirmed() {
    this.loansInitialization("confirmed");
    return this.loanItem;
  }

  selectAllDisabled() {
    this.loansInitialization("rejected");
    return this.loanItem;
  }

  selectAllPending() {
    this.loansInitialization("pending");
    return this.loanItem;
  }

  async approveLoan(client: UserModel, loanData: LoanModel) {
    const userRef = this.afs.doc(`loans/${loanData.uid}`);
    const data = {
      status: "approved",
      approvedByFirstname:  client.firstname,
      approvedByLastname: client.lastname,
      approvedByUID: client.uid,
    }
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    return userRef.set(data, { merge: true }).then((res) => {
      loading.dismiss();
    }).catch((err) => {
      loading.dismiss();
    });
  }

  async rejectLoan(client: UserModel, loanData: LoanModel) {
    const userRef = this.afs.doc(`loans/${loanData.uid}`);
    const data = {
      status: "rejected",
      approvedByFirstname:  client.firstname,
      approvedByLastname: client.lastname,
      approvedByUID: client.uid,
    }
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    return userRef.set(data, { merge: true }).then((res) => {
      loading.dismiss();
    }).catch((err) => {
      loading.dismiss();
    });
  }

}

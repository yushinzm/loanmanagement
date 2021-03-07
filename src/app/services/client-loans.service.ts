import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LoanModel } from '../models/loan.model';
import { UserModel } from '../models/user.model';
import { AuthService } from './auth.service';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientLoansService {
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
      this.loanCollection = this.afs.collection('loans', ref => ref.where('status', '==', "pending").where('uidOwner', "==", user.uid));
    } else if (condition === "rejected") {
      this.loanCollection = this.afs.collection('loans', ref => ref.where('status', '==', "rejected").where('uidOwner', "==", user.uid));
    } else if (condition === "confirmed") {
      this.loanCollection = this.afs.collection('loans', ref => ref.where('status', '==', "approved").where('uidOwner', "==", user.uid));
    } else {
      this.loanCollection = this.afs.collection('loans', ref => ref.where('uidOwner', "==", user.uid));
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
}

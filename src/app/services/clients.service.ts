import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { AuthService } from './auth.service';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  clientCollection: AngularFirestoreCollection<UserModel>;
  clientItem: Observable<UserModel[]>;
  authUserData: UserModel;
  constructor(
    private afs: AngularFirestore,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private auth: AuthService,
    private ModalController: ModalController,
  ) {
    this.clientsInitialization("all");
  }



  clientsInitialization(condition: string) {
    if (condition === "pending") {
      this.clientCollection = this.afs.collection('users', ref => ref.where('role', '==', "client").where('isNew', '==', false).where('accoutStatus', '==', "pending"));

    } else if (condition === "confirmed") {
      this.clientCollection = this.afs.collection('users', ref => ref.where('role', '==', "client").where('isNew', '==', false).where('active', '==', true).where('accoutStatus', '==', "enabled"));
    } else {
      this.clientCollection = this.afs.collection('users');
    }

    this.clientItem = this.clientCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as UserModel;
        const uid = a.payload.doc.id;
        const date = moment(data.dateCreated).format('MM/DD/YYYY');
        var activeDisplay = ""
        if (data.active) {
          activeDisplay = "Yes";
        } else {
          activeDisplay = "No";
        }

        if (data.accountStatus === "disabled") {
          data.accountStatus = "Disabled";
        } else if (data.accountStatus === "enabled") {
          data.accountStatus = "Enabled";
        }


        var sectionsDisplay = "Unset";
        if (data.sections != undefined) {

          for (let index = 0; index < data.sections.length; index++) {
            const element = data.sections[index];
            if (index === 0) {
              sectionsDisplay = element.name;
            } else {
              sectionsDisplay = sectionsDisplay + " / " + element.name;
            }
          }

          if (data.sections.length > 0) {
            sectionsDisplay = "Unset";
          }
        }
        data.lastSeen = moment(data.lastSeen.toDate()).format('MM/DD/YYYY');
        // data.lastSignInTime = moment(data.lastSignInTime.toDate()).format('MM/DD/YYYY');
        return { uid, activeDisplay, date, sectionsDisplay, ...data };
      }))
    );
  }


  selectAllConfirmed() {
    this.clientsInitialization("confirmed");
    return this.clientItem;
  }

  selectAllIncomplete() {
    this.clientsInitialization("incomplete");
    return this.clientItem;
  }

  selectAllDisabled() {
    this.clientsInitialization("disabled");
    return this.clientItem;
  }

  selectAllPending() {
    this.clientsInitialization("pending");
    return this.clientItem;
  }

  async enableAccount(client: UserModel, amount) {
    const userRef = this.afs.doc(`users/${client.uid}`);
    const data = {
      accoutStatus: "enabled",
      active: true,
      loanAmount: parseInt(amount),
    }
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    await this.ModalController.dismiss();
    return userRef.set(data, { merge: true }).then((res) => {
      loading.dismiss();
    }).catch((err) => {
      loading.dismiss();
    });
  }

  async disableAccount(client: UserModel) {
    const userRef = this.afs.doc(`users/${client.uid}`);
    const data = {
      accoutStatus: "pending",
      active: false,
      loanAmount: 0,
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

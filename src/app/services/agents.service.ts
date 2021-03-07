import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { AuthService } from './auth.service';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {
  agentCollection: AngularFirestoreCollection<UserModel>;
  agentItem: Observable<UserModel[]>;
  authUserData: UserModel;
  constructor(
    private afs: AngularFirestore,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private auth: AuthService,
  ) {
    this.agentsInitialization("all");
  }

  agentsInitialization(condition: string) {

    console.log(condition);


    if(condition === "pending"){
      this.agentCollection = this.afs.collection('users', ref => ref.where('role','==', "admin").where('isNew','==',false).where('accoutStatus', '==',"pending"));

    }else if(condition === "confirmed"){
      this.agentCollection = this.afs.collection('users', ref => ref.where('role','==', "admin").where('isNew','==',false).where('active', '==',true).where('accoutStatus', '==',"enabled"));
    }else{
      this.agentCollection = this.afs.collection('users');
    }

    this.agentItem = this.agentCollection.snapshotChanges().pipe(
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
        return { uid, activeDisplay,date, sectionsDisplay, ...data };
      }))
    );
  }

  selectAllConfirmed() {
    this.agentsInitialization("confirmed");
    return this.agentItem;
  }

  selectAllIncomplete() {
    this.agentsInitialization("incomplete");
    return this.agentItem;
  }

  selectAllDisabled() {
    this.agentsInitialization("disabled");
    return this.agentItem;
  }

  selectAllPending() {
    this.agentsInitialization("pending");
    return this.agentItem;
  }

  async enableAccount(agent: UserModel) {
    const userRef = this.afs.doc(`users/${agent.uid}`);
    const data = {
      accoutStatus: "enabled",
      active: true,
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

  async disableAccount(agent: UserModel) {
    const userRef = this.afs.doc(`users/${agent.uid}`);
    const data = {
      accoutStatus: "pending",
      active: false,
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

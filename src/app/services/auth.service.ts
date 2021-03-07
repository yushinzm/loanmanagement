import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";

import * as firebase from 'firebase';

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<UserModel>;
  userData: any;
  authUserData: UserModel;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router,
    public ngZone: NgZone,
  ) {
    this.afAuth.authState.subscribe(user => {
      this.userInfoData(user);

      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
        this.userInfoData(user);
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  userInfoData(user: firebase.default.User) {
    const userRef: AngularFirestoreDocument<UserModel> = this.afs.doc(`users/${user.uid}`);

    var userUpdated = userRef.snapshotChanges().subscribe(uData => {
      this.authUserData = uData.payload.data();
      localStorage.setItem('isNew', JSON.stringify(this.authUserData.isNew));
      JSON.parse(localStorage.getItem('isNew'));
      localStorage.setItem('fsUserData', JSON.stringify(uData.payload.data()));
      JSON.parse(localStorage.getItem('fsUserData'));
      userUpdated.unsubscribe();
    });
  }

  async updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<UserModel> = this.afs.doc(`users/${user.uid}`);


    const ds = this.afs.collection('users').doc(user.uid).snapshotChanges().subscribe(
      async res => {
        var doc = res.payload;
        if (!doc.exists) {
          const data = {
            active: false,
            sections: [],
            paths: [],
            roleName: '',
            roleUID: '',
            uid: user.uid,
            email: user.email,
            phoneNumber: user.phoneNumber,
            accoutStatus: "pending",
            lastSeen: firebase.default.firestore.FieldValue.serverTimestamp(),
            isNew: true,
            dateCreated: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime,
          }
          ds.unsubscribe();
          await userRef.set(data, { merge: true });

          this.router.navigate(['admin/']);
          return window.location.reload();
        } else {
          const data = {
            lastSeen: firebase.default.firestore.FieldValue.serverTimestamp(),
            lastSignInTime: user.metadata.lastSignInTime,
          }
          ds.unsubscribe();
          await userRef.set(data, { merge: true });
          this.router.navigate(['admin/']);
          return window.location.reload();
        }
      }
    );
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  get isNewUser(): boolean {
    const userIsNew = JSON.parse(localStorage.getItem('isNew'));
    return userIsNew;
  }


  get isApproved(): boolean {
    const approved = this.authUserData.active;
    return approved;
  }

  async signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('isNew');
      this.router.navigate(['/login']);
      window.location.reload();
    })
  }

  public checkAuthenticationAsPromise(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.afAuth.authState.subscribe(u => {
        const userRef: AngularFirestoreDocument<UserModel> = this.afs.doc(`users/${u.uid}`);
        var userUpdated = userRef.snapshotChanges().subscribe(uData => {
          userUpdated.unsubscribe();
          if (uData.payload.data().active) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    });
  }

  public checkRoleAsPromise(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.afAuth.authState.subscribe(u => {
        const userRef: AngularFirestoreDocument<UserModel> = this.afs.doc(`users/${u.uid}`);
        var userUpdated = userRef.valueChanges().subscribe(uData => {
          if (uData.role === 'admin') {
            resolve(true);
          } else {
            resolve(false);
          }
          userUpdated.unsubscribe();
        });
      });
    });
  }

  public checkActiveAsPromise(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.afAuth.authState.subscribe(u => {
        const userRef: AngularFirestoreDocument<UserModel> = this.afs.doc(`users/${u.uid}`);
        var userUpdated = userRef.valueChanges().subscribe(uData => {
          if (uData.active) {
            resolve(true);
          } else {
            resolve(false);
          }
          userUpdated.unsubscribe();
        });
      });
    });
  }

  public checkDisabledAsPromise(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.afAuth.authState.subscribe(u => {
        const userRef: AngularFirestoreDocument<UserModel> = this.afs.doc(`users/${u.uid}`);
        var userUpdated = userRef.snapshotChanges().subscribe(uData => {
          userUpdated.unsubscribe();
          if (uData.payload.data().accountStatus === "pending" || uData.payload.data().accountStatus === 'disabled') {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    });
  }
}

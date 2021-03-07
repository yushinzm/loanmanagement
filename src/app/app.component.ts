import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  loading = true;
  loggedIn = true;
  admin = false;
  constructor(
    private platform: Platform,
    public afAuth: AngularFireAuth,
    public router: Router,
    public authService: AuthService,

  ) {
    this.initializeApp();
    this.afAuth.authState.subscribe(async (user) => {
      this.loading = false;
      if (user?.phoneNumber === undefined) {
        this.router.navigate(['/login'])
        this.loggedIn = false;
      } else {
        var d = await this.authService.checkActiveAsPromise();
        if(d){
          this.loggedIn = true;
        }else {
          this.loggedIn = false;
        }
        this.authService.checkRoleAsPromise().then(r => {
          if (r) {
            this.admin = true;
          } else {
            this.admin = false
          }
        });
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
    });
  }

  ngOnInit() {
  }
}

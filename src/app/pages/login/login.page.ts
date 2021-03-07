import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from 'firebaseui-angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    constructor(public auth: AuthService, private router: Router, ) { }
    ngOnInit(): void {
    }

    async successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
        await this.auth.updateUserData(signInSuccessData.authResult.user);
    }

    errorCallback(errorData: FirebaseUISignInFailure) {
        console.log("something went wrong:" + errorData);
    }
}

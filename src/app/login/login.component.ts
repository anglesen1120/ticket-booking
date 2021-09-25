import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserServices } from '../services/user.services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup | undefined;

    userLoggedIn: any | undefined;

    constructor(
        private formBuilder: FormBuilder,
        private userServices: UserServices,
        private router: Router
    ) {
        this.loginForm = this.formBuilder.group({
            email: [],
            password: [],
        });
    }

    ngOnInit() {}

    login() {
        var dataUpdate = new User();
        dataUpdate.email = this.loginForm?.value.email;
        dataUpdate.password = this.loginForm?.value.password;
        dataUpdate.roles = 'User';
        this.userServices
            .loginUser(dataUpdate.email, dataUpdate.password)
            .subscribe((result) => {
                // if (result.size > 0) {
                //     console.log('result login', result.docs[0].id);
                //     console.log(result.map)
                //     localStorage.setItem('BK_userId', result.docs[0].id);
                //     alert('Login is successfull');
                //     this.router.navigate(['booking']);
                // } else {
                //     alert('The username or password is incorrect!');
                // }
                if (result.length > 0) {
                    const user = result.map(x => x.payload.doc.data());
                    const userId = result.map(x => x.payload.doc.id);
                    this.userLoggedIn = user[0];
                    localStorage.setItem('BK_userId', userId[0]);
                    sessionStorage.setItem("USER_LOGGEDIN", JSON.stringify(this.userLoggedIn))
                    alert('Login is successfull');
                    this.router.navigate(['booking']);
                }else{
                    alert('The username or password is incorrect!');
                }
            });
    }
}

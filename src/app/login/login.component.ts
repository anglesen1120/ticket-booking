import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserServices } from '../services/user.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | undefined;
  constructor(private formBuilder: FormBuilder, private userServices: UserServices, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: [],
      password: []
    })
   }

  ngOnInit() {
  }

  login() {
    var dataUpdate = new User();
    dataUpdate.email = this.loginForm?.value.email;
    dataUpdate.password = this.loginForm?.value.password;
    dataUpdate.roles = 'User'
    this.userServices.loginUser(dataUpdate.email, dataUpdate.password).get().subscribe((result) => {
      if (result.size > 0) {
        console.log('result login', result.docs[0].id);
        localStorage.setItem('BK_userId', result.docs[0].id);
        alert('Login is successfull');
        this.router.navigate(['booking']);
      } else {
        alert('The username or password is incorrect!');
      }
    });
  }

}

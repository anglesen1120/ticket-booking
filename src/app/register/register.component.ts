import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserServices } from '../services/user.services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup | undefined;
  constructor(private formBuilder: FormBuilder, private userServices: UserServices, private router: Router) {
    this.registerForm = this.formBuilder.group({
      email: [],
      password: []
    })
  }

  ngOnInit() {
  }

  register() {
    var dataUpdate = new User();
    dataUpdate.email = this.registerForm?.value.email;
    dataUpdate.password = this.registerForm?.value.password;
    dataUpdate.roles = 'User',
      dataUpdate.level = '',
      dataUpdate.name = '',
      dataUpdate.points = 0,
      dataUpdate.pointSpend = 0
    console.log('data post', dataUpdate);
    this.userServices.getUser(dataUpdate.email).get().subscribe((result) => {
      console.log('check result', result.size);
      if (result.size > 1) {
        alert('Email or username is exit on the system! please check again');

      } else {
        this.userServices.registerUser(Object.assign({}, dataUpdate)).then(result => {
          console.log('result', result.id);
          if (result.id != null) {
            alert('Create account successfully');
            this.router.navigate(['login']);
          }
        }).catch(error => {
          alert('Error' + error)
        });
      }
    });
  }



}

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-customer-point',
    templateUrl: './customer-point.component.html',
    styleUrls: ['./customer-point.component.css'],
})
export class CustomerPointComponent implements OnInit {

    userLoggedIn: any;

    constructor() {}

    ngOnInit() {
        const userFromStorage: any = localStorage.getItem('USER_LOGGEDIN');
        this.userLoggedIn = JSON.parse(userFromStorage);
    }
}

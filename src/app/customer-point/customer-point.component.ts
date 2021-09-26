import { Component, OnInit } from '@angular/core';
import { UserServices } from '../services/user.services';

export class DataCustomer {
    email: string | undefined;
    name: string | undefined;
    level: string | undefined;
    pointSpend : number | undefined;
    points: string | undefined;
    roles: string | undefined;
}

@Component({
    selector: 'app-customer-point',
    templateUrl: './customer-point.component.html',
    styleUrls: ['./customer-point.component.css'],
})
export class CustomerPointComponent implements OnInit {

    userLoggedIn: any;
    dataCustomer = new DataCustomer;

    constructor(private userServices: UserServices) { }

    ngOnInit() {
        const userFromStorage: any = sessionStorage.getItem('USER_LOGGEDIN');
        this.userLoggedIn = JSON.parse(userFromStorage);
        this.getUser();
    }

    getUser() {
        let idUser = localStorage.getItem('UserName');
        let userName;
        if (idUser != null) {
            userName = JSON.parse(idUser).email;
        }

        this.userServices.getUser(userName).get().subscribe((result) => {
            console.log('result customer', result.docs.map(x => x.data())[0] as DataCustomer);
            if (result != null) {
                this.dataCustomer = result.docs.map(x => x.data())[0] as DataCustomer;
            }
        });
    }
}

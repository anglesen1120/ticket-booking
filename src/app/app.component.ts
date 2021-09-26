import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataCustomer } from './customer-point/customer-point.component';
import { UserServices } from './services/user.services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    isCollapsed = false;

    userLoggedIn: any | undefined;
    dataCustomer = new DataCustomer;

    constructor(
        private router: Router,
        private userService: UserServices
    ) { }

    ngOnInit(): void {
        this.getUser();
        const userFromStorage: any = localStorage.getItem('UserName')
        this.userLoggedIn = JSON.parse(userFromStorage)
        this.userService.userLoggedIn$.subscribe(result => {
            const userResult = result.map(x => x.payload.doc.data());
            this.userLoggedIn = userResult[0]
            console.log(this.userLoggedIn)
        });
        
    }

    logout() {
        this.userLoggedIn = null;
        localStorage.removeItem('UserName');
        localStorage.removeItem('BK_userId');
        sessionStorage.removeItem('USER_LOGGEDIN');
        this.router.navigate(['login']);
    }


    getUser() {
        let idUser = localStorage.getItem('UserName');
        let userName;
        if (idUser != null) {
            userName = JSON.parse(idUser).email;
        }

        this.userService.getUser(userName).get().subscribe((result) => {
            console.log('result customer', result.docs.map(x => x.data())[0] as DataCustomer);
            if (result != null) {
                this.dataCustomer = result.docs.map(x => x.data())[0] as DataCustomer;
            }
        });
    }
}

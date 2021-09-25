import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServices } from './services/user.services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    isCollapsed = false;

    userLoggedIn: any | undefined;

    constructor(
        private router: Router,
        private userService: UserServices
    ) {}

    ngOnInit(): void {
        const userFromStorage: any = localStorage.getItem('USER_LOGGEDIN')
        this.userLoggedIn = JSON.parse(userFromStorage)
        this.userService.userLoggedIn$.subscribe(result =>{
            const userResult = result.map(x => x.payload.doc.data());
            this.userLoggedIn = userResult[0]
            console.log(this.userLoggedIn)
        })
    }

    logout() {
        this.userLoggedIn = null;
        localStorage.removeItem('USER_LOGGEDIN');
        this.router.navigate(['login']);
    }
}

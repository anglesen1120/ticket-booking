import { Component, OnInit } from '@angular/core';
import { UserServices } from '../services/user.services';
interface Person {
    key: string;
    name: string;
    age: number;
    address: string;
}

@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {

    listOfData: any[] = [];
    userLoggedIn: any

    constructor(
        private userService: UserServices
    ) {}

    ngOnInit() {
        const userFromStorage: any = sessionStorage.getItem('USER_LOGGEDIN')
        this.userLoggedIn = JSON.parse(userFromStorage)
        this.userService.listUser().subscribe(val => {
            this.listOfData = val
        })
    }
}

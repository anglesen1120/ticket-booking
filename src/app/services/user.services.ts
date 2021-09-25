import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Observable, Subject } from "rxjs";
import { Booking } from "../model/booking.model";
import { User } from "../model/user.model";
import { map, tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class UserServices {

    private userLoggedIn = new Subject<any[]>();
    userLoggedIn$ = this.userLoggedIn.asObservable();

    constructor(private fireStore: AngularFirestore) { }

    getUser(email: string | undefined) {
        return this.fireStore.collection('user', ref => ref.where("email", "==", email));

    }

    loginUser(email: string | undefined, password: string | undefined) {
        return this.fireStore.collection('user', ref => ref.where("email", "==", email).where("password", "==", password))
            .snapshotChanges().pipe(
                tap((result) => {
                    this.userLoggedIn.next(result);
                })
            );
    }

    registerUser(user: User) {

        return this.fireStore
            .collection("user")
            .add(user)
    };

    createBookingUser(dataBooking: Booking){
        return this.fireStore.collection('booking').add(dataBooking);
    }

}

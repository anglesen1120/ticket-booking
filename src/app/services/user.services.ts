import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Booking } from "../model/booking.model";
import { User } from "../model/user.model";


@Injectable({
    providedIn: 'root'
})

export class UserServices {
    constructor(private fireStore: AngularFirestore) { }

    getUser(email: string | undefined) {
        return this.fireStore.collection('user', ref => ref.where("email", "==", email));

    }

    loginUser(email: string | undefined, password: string | undefined) {
        return this.fireStore.collection('user', ref => ref.where("email", "==", email).where("password", "==", password));
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
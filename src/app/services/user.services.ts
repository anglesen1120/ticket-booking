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

    listUser() {
        return this.fireStore.collection('user').valueChanges();
    }

    registerUser(user: User) {

        return this.fireStore
            .collection("user")
            .add(user)
    };

    createBookingUser(dataBooking: Booking) {
        return this.fireStore.collection('booking').add(dataBooking);
    }

    updatePointAndLevel(points: number, discount: number) {

        let idUser = localStorage.getItem('BK_userId');

        let valueOfUSer;
        let finalPoint: number;
        let pointCurrentOfUser: number;
        let pointSpend: number;
        console.log('id user ', idUser);
        this.fireStore.collection('user').doc(idUser == null ? '' : idUser).get().pipe(map(action => {
            const data: any = action.data();
            const id = action.id;
            return { id, data };
        })).subscribe((result) => {
            let level: string = '';
            console.log('result data', result);

            // calculator Point
            if (result.data.level == "") {
                finalPoint = 0;
            } if (result.data.level == "Silver") {
                finalPoint = (points * 5) / 100;
            } if (result.data.level == "Gold") {
                finalPoint = (points * 10) / 100;
            } if (result.data.level == "Diamond") {
                finalPoint = (points * 15) / 100;
            }


            pointCurrentOfUser = result.data.points + finalPoint - discount;
            pointSpend = result.data.pointSpend + points;
            if (pointSpend >= 5000 && pointSpend <= 7500) {
                level = "Silver"
            } else if (pointSpend > 7500 && pointSpend <= 10000) {
                level = "Gold"
            } else if (pointSpend > 10000) {
                level = "Diamond"
            }

            this.fireStore.collection('user').doc(result.id).update({ points: pointCurrentOfUser, level: level, pointSpend: pointSpend }).then((result) => {
                console.log('update successfull');
                alert(`The ticket is create success with ${finalPoint}`);
            }).catch(err => {
                console.log('Error', err);
            });

        });


    }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Booking } from '../model/booking.model';
import { UserServices } from '../services/user.services';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {

    bookingForm: FormGroup | undefined;
    price: number = 100;
    noOfPass: number = 1;
    discount: number = 0;
    maxDiscount: number = 0;


    constructor(
        private formBuilder: FormBuilder,
        private userServices: UserServices,
        private router: Router
    ) {
        let userLoggedIn: any = sessionStorage.getItem('USER_LOGGEDIN');
        this.maxDiscount = (JSON.parse(userLoggedIn).points);

        this.bookingForm = this.formBuilder.group({
            from: ["HCM"],
            to: ["HCM"],
            dateFight: [],
            price: [1000],
            noPas: [1],
            discount: [0, {
                validators: [
                    Validators.max(this.maxDiscount)
                ]
            }],
            totalAmount: [{
                value: 1000,
                disabled: true
            }]
        });
    }

    ngOnInit() {
        
    }

    onSelectPas() {
        this.noOfPass = this.bookingForm?.value.noPas
        this.totalAmount(this.bookingForm?.value.price, this.noOfPass, this.bookingForm?.value.discount);
    }

    onPriceChange() {
        this.price = (this.bookingForm?.value.price)
        this.totalAmount(this.price, this.noOfPass, this.discount)
    }

    onDiscountChange() {
        this.discount = this.bookingForm?.value.discount

        // Check discount
        let userLoggedIn: any = sessionStorage.getItem('USER_LOGGEDIN');
        this.maxDiscount = (JSON.parse(userLoggedIn).points);
        if (this.discount > this.maxDiscount) {
            alert('The point is not enough for this action! Please check again');
            this.bookingForm?.controls.discount.setValue(0);
        } else {
            this.totalAmount(this.bookingForm?.value.price, this.bookingForm?.value.noPas, this.discount);
        }
    }

    totalAmount(price: number, noOfPass: number, discount: number) {
        this.bookingForm?.patchValue({
            totalAmount: (price * noOfPass) - discount
        })
    }

    createBookingTicket() {
        let idUser = localStorage.getItem('BK_userId');
        var dataBooking = new Booking();
        dataBooking.discount = this.bookingForm?.value.discount;
        dataBooking.from = this.bookingForm?.value.from;
        dataBooking.to = this.bookingForm?.value.to;
        dataBooking.price = this.bookingForm?.value.price;
        dataBooking.noOfPass = this.bookingForm?.value.noPas;
        dataBooking.priceAfterDiscount = this.bookingForm?.controls["totalAmount"].value;
        if (idUser) {
            dataBooking.idUser = idUser;
        }

        this.userServices
            .createBookingUser(Object.assign({}, dataBooking))
            .then((result) => {
                if (result.id != null) {
                    // alert(`Booking is successfully and you have more ${dataBooking.priceAfterDiscount} point!`);
                    // this.router.navigate(['customer-point']);
                    this.userServices.updatePointAndLevel(dataBooking.priceAfterDiscount == null ? 0 : dataBooking.priceAfterDiscount, dataBooking.discount == null ? 0 : dataBooking.discount);
                }
            })
            .catch((error) => {
                alert('Error' + error);
            });
    }
}

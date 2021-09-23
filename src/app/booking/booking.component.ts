import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Booking } from '../model/booking.model';
import { UserServices } from '../services/user.services';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup | undefined;
  constructor(private formBuilder: FormBuilder, private userServices: UserServices, private router: Router) {
    this.bookingForm = this.formBuilder.group({
      from: [],
      to: [],
      dateFight: [],
      price: [1000],
      noPas: [1],
      discount: [0]
    })
  }

  ngOnInit() {
  }

  createBookingTicket() {
    let idUser = localStorage.getItem('BK_userId');
    var dataBooking = new Booking();
    dataBooking.discount = this.bookingForm?.value.discount;
    dataBooking.from = this.bookingForm?.value.from;
    dataBooking.to = this.bookingForm?.value.to;
    dataBooking.price = this.bookingForm?.value.price;
    dataBooking.noOfPass = this.bookingForm?.value.noPas;
    dataBooking.priceAfterDiscount = this.bookingForm?.value.price - this.bookingForm?.value.discount;
    if (idUser) {
      dataBooking.idUser = idUser;
    }


    this.userServices.createBookingUser(Object.assign({}, dataBooking)).then(result => {
      console.log('result', result.id);
      if (result.id != null) {
        alert('Booking is successfully');
        this.router.navigate(['customer-point']);
      }
    }).catch(error => {
      alert('Error' + error)
    });
  }
}




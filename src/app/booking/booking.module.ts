import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [BookingComponent],
  imports: [
    BookingRoutingModule, ReactiveFormsModule, FormsModule, CommonModule
  ]
})
export class BookingModule { }

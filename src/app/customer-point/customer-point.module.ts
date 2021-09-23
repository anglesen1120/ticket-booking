import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPointComponent } from './customer-point.component';
import { CustomerPointRoutingModule } from './customer-point-routing.module';



@NgModule({
  declarations: [CustomerPointComponent],
  imports: [
    CommonModule, CustomerPointRoutingModule
  ]
})
export class CustomerPointModule { }

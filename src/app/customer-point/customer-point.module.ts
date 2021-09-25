import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPointComponent } from './customer-point.component';
import { CustomerPointRoutingModule } from './customer-point-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDividerModule } from 'ng-zorro-antd/divider';



@NgModule({
  declarations: [CustomerPointComponent],
  imports: [
    CommonModule,
    CustomerPointRoutingModule,
    NzLayoutModule,
    NzTableModule,
    NzDividerModule
  ]
})
export class CustomerPointModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerPointComponent } from './customer-point.component';

const routes: Routes = [{
  path: '',
  component: CustomerPointComponent
}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerPointRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserRoutingModule } from './list-user-routing.module';
import { ListUserComponent } from './list-user.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDividerModule } from 'ng-zorro-antd/divider';



@NgModule({
  declarations: [ListUserComponent],
  imports: [
    CommonModule,
    ListUserRoutingModule,
    NzLayoutModule,
    NzTableModule,
    NzDividerModule
  ]
})
export class ListUserModule { }

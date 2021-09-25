import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'booking', loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule) },
  { path: 'customer-point', loadChildren: () => import('./customer-point/customer-point.module').then(m => m.CustomerPointModule) },
  { path: 'list-user', loadChildren: () => import('./list-user/list-user.module').then(m => m.ListUserModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

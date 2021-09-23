import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;

  constructor(private router: Router) { }


  logout() {
    localStorage.removeItem('BK_userId');
    this.router.navigate(['login']);
  }
}

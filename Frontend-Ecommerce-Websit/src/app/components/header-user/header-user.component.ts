import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent {
  phone= sessionStorage.getItem('phone');
   

  constructor(public router: Router) { }

  logOut() {
    localStorage.removeItem('tel')
    this.router.navigate(['/produit']);
  }

  
}

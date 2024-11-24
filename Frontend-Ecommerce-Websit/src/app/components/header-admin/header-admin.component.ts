import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent {
  phone= sessionStorage.getItem('phone');
   

  constructor(public router: Router) { }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/seconnecter']);
  }
}

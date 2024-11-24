// agent.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Injectable({
  providedIn: 'root',
})
export class AgentGuard implements CanActivate {
  constructor( private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log(localStorage.getItem('tel'));
    if (localStorage.getItem('tel')!= null) {
      return true;
    } else {
      this.router.navigate(['seconnecter']);
      return false;
    }
  }
}

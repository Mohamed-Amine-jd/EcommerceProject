// agent.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class AgentGuard implements CanActivate {
  constructor(private shared: SharedService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.shared.getTel()) {
      return true;
    } else {
      this.router.navigate(['seconnecter']);
      return false;
    }
  }
}

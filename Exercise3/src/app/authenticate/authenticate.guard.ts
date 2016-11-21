import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticateService} from './authenticate.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthenticateGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    if (AuthenticateService.isLoggedIn()) {
      if (state.url === '/logout') {
        AuthenticateService.logout();
      }
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
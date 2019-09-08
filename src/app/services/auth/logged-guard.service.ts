import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { SessionService } from '../session/session.service';

@Injectable()
export class LoggedGuard implements CanActivate {

  constructor(private authService: AuthService,
              private sessionService: SessionService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isUserLogged()) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}

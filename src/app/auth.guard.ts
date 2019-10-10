import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';


import { AuthService } from './_services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authManager: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (route) {
      return this.authManager.isAuth()
        .then(token => {
          if (!token) {
            this.router.navigate(['/auth']);
          }
          return !!token;
        });
    }
  }

}

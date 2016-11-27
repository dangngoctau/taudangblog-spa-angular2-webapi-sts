import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }
    canActivate() {
        return this.authService.isLoggedIn ? true : this.router.navigate(['oauth_login']);
    }
}

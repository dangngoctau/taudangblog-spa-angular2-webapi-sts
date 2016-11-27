import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({
    template: '<div>Oauth signout.</div>'
})
export class OAuthSignOutComponent {
    constructor(private authService: AuthService) {
        authService.signout();
    }
}

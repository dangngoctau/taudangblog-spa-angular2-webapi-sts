import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    moduleId: module.id,
    template: '<div>OAuth callback page</div>'
})
export class OAuthCallbackComponent {
    constructor(private authService: AuthService, private router: Router) {
        this.authService.receiveToken(this.router.url);
    }
}

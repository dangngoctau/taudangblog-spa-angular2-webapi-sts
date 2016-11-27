import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    moduleId: module.id,
    template: '<div>OAuth login page</div>'
})
export class OAuthLoginComponent {
    constructor(private authService: AuthService) {
        authService.login();
    }
}

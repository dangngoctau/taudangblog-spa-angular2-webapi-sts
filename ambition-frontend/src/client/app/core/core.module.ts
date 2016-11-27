import { OAuthSignOutComponent } from './oauth-signout.component';
import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthServiceConfig, AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { OAuthLoginComponent } from './oauth-login.component';
import { OAuthCallbackComponent } from './oauth-callback.component';
import { CoreRoutes } from './core.routes';

@NgModule({
    imports: [RouterModule.forRoot(CoreRoutes)],
    declarations: [OAuthLoginComponent, OAuthCallbackComponent, OAuthSignOutComponent]
})
export class CoreModule {
    static forRoot(config: AuthServiceConfig): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                { provide: AuthServiceConfig, useValue: config },
                AuthGuardService,
                AuthService
            ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('Core module is already loaded.');
        }
    }
}

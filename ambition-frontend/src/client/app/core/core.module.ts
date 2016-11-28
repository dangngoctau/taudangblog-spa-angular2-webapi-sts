import { OAuthSignOutComponent } from './oauth-signout.component';
import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthServiceConfig, AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { AuthHttp } from './auth.http';
import { OAuthLoginComponent } from './oauth-login.component';
import { OAuthCallbackComponent } from './oauth-callback.component';
import { CoreRoutes } from './core.routes';
import { RequestOptions, Http, XHRBackend } from '@angular/http';
import { AuthRequestOptions } from './auth.request.options';

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
                AuthService,
                {
                    provide: RequestOptions,
                    useFactory: (authService: AuthService) => {
                        return new AuthRequestOptions(authService);
                    },
                    deps: [AuthService]
                },
                {
                    provide: Http,
                    useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
                        return new AuthHttp(backend, defaultOptions);
                    },
                    deps: [XHRBackend, RequestOptions]
                }
            ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('Core module is already loaded.');
        }
    }
}

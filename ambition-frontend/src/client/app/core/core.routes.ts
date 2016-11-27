import { Route } from '@angular/router';
import { OAuthLoginComponent } from './oauth-login.component';
import { OAuthCallbackComponent } from './oauth-callback.component';
import { OAuthSignOutComponent } from './oauth-signout.component';
export const CoreRoutes: Route[] = [
  {
    path: 'oauth_login',
    component: OAuthLoginComponent
  },
  {
    path: 'oauth_callback',
    component: OAuthCallbackComponent
  }, {
    path: 'oauth_signout',
    component: OAuthSignOutComponent
  }
];

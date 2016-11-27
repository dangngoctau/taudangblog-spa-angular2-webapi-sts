import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AuthServiceConfig } from './core/auth.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AboutModule, HomeModule,
    SharedModule.forRoot(),
    CoreModule.forRoot(AppModule.getAuthServiceConfig())
  ],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})

export class AppModule {
  static getAuthServiceConfig(): AuthServiceConfig {
    let config = new AuthServiceConfig();
    config.authority = 'https://localhost:44300';
    config.clientId = 'js';
    config.redirectUri = window.location.protocol + '//' + window.location.host + '/oauth_callback';
    config.silentRediectUri = window.location.protocol + '//' + window.location.host + '/silent-renew.html';
    config.responseType = 'id_token token';
    config.scope = 'openid profile';
    config.accessTokenExpiringNotificationTime = 10;
    config.automaticSilentRenew = true;
    config.filterProtocolClaims = true;
    config.loadUserInfo = false;
    return config;
  };
}

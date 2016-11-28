import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
// import { Observable } from 'rxjs/Rx';
import { UserManager, Log } from 'oidc-client';

export class AuthServiceConfig {
    authority: string;
    clientId: string;
    redirectUri: string;
    silentRediectUri: string;
    responseType: string;
    scope: string;
    accessTokenExpiringNotificationTime: number;
    automaticSilentRenew: boolean;
    filterProtocolClaims: boolean;
    loadUserInfo: boolean;
}

@Injectable()
export class AuthService {
    userLoggedIn: EventEmitter<string> = new EventEmitter<string>(null);
    private userManager: UserManager;
    private user: any = null;

    constructor(private config: AuthServiceConfig, private router: Router) {
        Log.logger = console;
        console.log('auth service is created at', Date.now().toString());
        let settings = this.getUserManagerSettings();
        this.userManager = new UserManager(settings);
        this.userManager.events.addUserLoaded((user: any) => {
            console.log('loaded userd: ', user);
            this.userLoggedIn.emit(`${user.profile.given_name} expires at ${user.expires_at}`);
            this.user = user;
        });
    }

    getUserManagerSettings(): any {
        return {
            authority: this.config.authority,
            client_id: this.config.clientId,
            redirect_uri: this.config.redirectUri,
            silent_redirect_uri: this.config.silentRediectUri,
            response_type: this.config.responseType,
            scope: this.config.scope,
            accessTokenExpiringNotificationTime: this.config.accessTokenExpiringNotificationTime,
            automaticSilentRenew: this.config.automaticSilentRenew,
            filterProtocolClaims: this.config.filterProtocolClaims,
            loadUserInfo: this.config.loadUserInfo,
            //userStore: new WebStorageStateStore({ store: window.localStorage })
        };
    }

    login() {
        this.userManager.signinRedirect().then(() => {
            // console.log('signinRedirect done');
        }).catch((err: any) => {
            console.log(err);
        });
    }

    signout() {
        this.userManager.signoutRedirect().then(() => {
            console.log('signoutRedirect done');
        }).catch((err: any) => {
            console.log(err);
        });
    }

    receiveToken(callbackUrl: string) {
        this.userManager.signinRedirectCallback(callbackUrl).then((user: any) => {
            this.userLoggedIn.emit(`${user.profile.given_name} expires at ${user.expires_at}`);
            this.router.navigate(['']);
        }).catch((err: any) => {
            console.log(err);
            this.router.navigate(['oauth_login']);
        });
    }

    receiveRenewedToken(callbackUrl: string) {
        this.userManager.signinSilentCallback(callbackUrl);
    }

    get isLoggedIn(): boolean {
        return this.user !== null;
    }

    get authorizationHeader(): string {
        return this.user === null ? '' : `${this.user.token_type} ${this.user.access_token}`;
    }
}

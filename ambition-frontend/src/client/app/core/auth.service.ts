import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { UserManager, Log } from 'oidc-client';


declare var WebStorageStateStore: any;

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
    private authHeaders: Headers;

    constructor(private config: AuthServiceConfig, private router: Router, private http: Http) {
        Log.logger = console;
        console.log('auth service is created at', Date.now().toString());
        let settings = this.getUserManagerSettings();
        this.userManager = new UserManager(settings);
        this.userManager.events.addUserLoaded((user: any) => {
            console.log('loaded userd: ', user);
            this.userLoggedIn.emit(`${user.profile.given_name} expires at ${user.expires_at}`);
            this.user = user;
        });
        this.userManager.events.addAccessTokenExpiring((event: any) => {
            console.info('accessTokenExpiring raised');
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
            checkSessionInterval: 120 * 1000
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
            this.userLoggedIn.emit(`${user.profile.given_name} expires at ${user.expires_at} s`);
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


    get(url: string, options?: RequestOptions): Observable<Response> {
        options = this.setRequestOptions(options);
        return this.http.get(url, options);
    }

    put(url: string, data: any, options?: RequestOptions): Observable<Response> {
        let body = JSON.stringify(data);
        options = this.setRequestOptions(options);
        return this.http.put(url, body, options);
    }

    delete(url: string, options?: RequestOptions): Observable<Response> {
        options = this.setRequestOptions(options);
        return this.http.delete(url, options);
    }

    post(url: string, data: any, options?: RequestOptions): Observable<Response> {
        let body = JSON.stringify(data);
        options = this.setRequestOptions(options);
        return this.http.post(url, body, options);
    }

    private setAuthHeaders(user: any) {
        this.authHeaders = new Headers();
        this.authHeaders.append('Authorization', `${user.token_type} ${user.access_token}`);
        this.authHeaders.append('Content-Type', 'application/json');
        this.authHeaders.append('Accept', 'application/json');
    }

    private setRequestOptions(options?: RequestOptions) {
        this.setAuthHeaders(this.user);
        if (options) {
            //todo:
            //options.headers.append(this.authHeaders.keys[0], this.authHeaders.values[0]);
        } else {
            options = new RequestOptions({ headers: this.authHeaders });
        }

        return options;
    }
}

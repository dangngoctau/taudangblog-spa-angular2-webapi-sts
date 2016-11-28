import { Http, ConnectionBackend, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthHttp extends Http {
    // http://restlet.com/blog/2016/04/18/interacting-efficiently-with-a-restful-service-with-angular2-and-rxjs-part-3/
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
        console.log('auth http is created at', Date.now().toString());
    }
}

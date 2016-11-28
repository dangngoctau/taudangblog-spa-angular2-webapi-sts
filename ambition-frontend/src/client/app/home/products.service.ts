import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Product } from './index';
import { Config } from '../shared/index';

@Injectable()
export class ProductService {
    constructor(private _http: Http) {
    }

    loadProducts(): Observable<Product[]> {
        // todo: improve by move api url to another place.
        let products = this._http.get(`${Config.API}/api/product/load`)
            .map((res: Response) => res.json())
            .catch(this.handleError);
        return products;
    }

    addProduct(product: Product): Observable<string> {
        let createdProductId = this._http.post(`${Config.API}/api/product`, product)
            .map((res: Response) => res.text())
            .catch(this.handleError);
        return createdProductId;
    }

    // todo: improve by using a generic handler.
    private handleError(error: any) {
        let errorMsg = error.message || `could not retrive data!`;
        console.error(errorMsg);

        return Observable.throw(errorMsg);
    }
}

import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import {Product} from "./product";
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  constructor(private http: Http) { }

  getProducts() {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    return this.http.get('http://localhost:9900/api/products', options)
      .map(response => <Product[]>response.json());
  }

  sendToPlay(formData) {
    const serializedForm = JSON.stringify(formData);
    // console.log(serializedForm);

    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    this.http.post('http://localhost:9900/api/product', serializedForm, options)
      .subscribe(
        data => console.log('wyslane!', data),
        error => console.error('nie bangla', error)
      );
  }

}

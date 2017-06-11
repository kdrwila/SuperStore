import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Product } from "../models/product";
import { ProductType } from "../models/productType";
import { BasketProduct } from "../models/BasketProduct";
import 'rxjs/add/operator/map';

@Injectable()
export class BasketService 
{
	constructor(private http: Http) { }

	getProductsInBasket(userId: number) 
	{
		const headers: Headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');

		const options = new RequestOptions({headers: headers});

		return this.http.get('http://localhost:9900/api/basket/user/' + userId, options).map(response => <BasketProduct[]>response.json());
	}

    addProductToBasket(product: ProductType, userId: number)
	{
        const result = JSON.parse
        (
            '{  "user_id":' + userId +', \
                "quantity":1, \
                "product_id":' + product.product_id + ', \
                "type_id":' + product.type_id + '}'
        );

		const headers: Headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');

		const options = new RequestOptions({headers: headers});

		this.http.post('http://localhost:9900/api/basket', result, options).subscribe
		(
			data => console.log('wyslane!', data),
			error => console.error('nie bangla', error)
		);
	}

	removeProductFromBasket(userId: number, id: number)
	{
		const headers: Headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');

		const options = new RequestOptions({headers: headers});

		return this.http.delete('http://localhost:9900/api/basket/user/' + userId + '/' + id, options);
	}
}

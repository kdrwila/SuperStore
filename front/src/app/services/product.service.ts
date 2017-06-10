import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Product } from "../models/product";
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService 
{
	constructor(private http: Http) { }

	getProducts() 
	{
		const headers: Headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');

		const options = new RequestOptions({headers: headers});

		return this.http.get('http://localhost:9900/api/products', options).map(response => <Product[]>response.json());
	}

	getProduct(id: number)
	{
		const headers: Headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');

		const options = new RequestOptions({headers: headers});

		return this.http.get('http://localhost:9900/api/product/' + id, options).map(response => <Product>response.json());
	}

	sendToPlay(formData) 
	{
		const serializedForm = JSON.stringify(formData);

		const headers: Headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');

		const options = new RequestOptions({headers: headers});

		this.http.post('http://localhost:9900/api/product', serializedForm, options).subscribe
		(
			data => console.log('wyslane!', data),
			error => console.error('nie bangla', error)
		);
	}

	updateProduct(formData, id: number)
	{
		const serializedForm = JSON.stringify(formData);

		const headers: Headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');

		const options = new RequestOptions({headers: headers});

		this.http.put('http://localhost:9900/api/product/' + id, serializedForm, options).subscribe
		(
			data => console.log('wyslane!', data),
			error => console.error('nie bangla', error)
		);
	}

	removeProduct(id: number)
	{
		const headers: Headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');

		const options = new RequestOptions({headers: headers});

		this.http.delete('http://localhost:9900/api/product/' + id, options).subscribe
		(
			data => console.log('wyslane!', data),
			error => console.error('nie bangla', error)
		);
	}

	addType(formData, productId: number)
	{
		const serializedForm = JSON.stringify(formData);

		const headers: Headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');

		const options = new RequestOptions({headers: headers});

		this.http.post('http://localhost:9900/api/product/' + productId + '/type', serializedForm, options).subscribe
		(
			data => console.log('wyslane!', data),
			error => console.error('nie bangla', error)
		);
	}

	removeType(id: number, product_id: number)
	{
		const headers: Headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');

		const options = new RequestOptions({headers: headers});

		this.http.delete('http://localhost:9900/api/product/' + product_id + '/type/' + id, options).subscribe
		(
			data => console.log('wyslane!', data),
			error => console.error('nie bangla', error)
		);
	}
}

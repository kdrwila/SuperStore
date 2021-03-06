import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Category } from "../models/category";
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {

	constructor(private http: Http) { }

	getCategories() 
	{
		const headers: Headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');

		const options = new RequestOptions({headers: headers});

		var recived;

		this.http.get('http://localhost:9900/api/categories', options).map(response => <Category[]>response.json()).subscribe(data => recived = data);

		return this.http.get('http://localhost:9900/api/categories', options).map(response => <Category[]>response.json());
	}

	getCategory(id: number)
	{
		const headers: Headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');

		const options = new RequestOptions({headers: headers});

		return this.http.get('http://localhost:9900/api/category/' + id, options).map(response => <Category>response.json());
	}

	sendToPlay(formData) 
	{
		const serializedForm = JSON.stringify(formData);

		const headers: Headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');

		const options = new RequestOptions({headers: headers});

		return this.http.post('http://localhost:9900/api/category', serializedForm, options);
	}

	removeCategory(id: number)
	{
		const headers: Headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');

		const options = new RequestOptions({headers: headers});

		return this.http.delete('http://localhost:9900/api/category/' + id, options);
	}

	updateCategory(formData, id: number)
	{
		const serializedForm = JSON.stringify(formData);

		const headers: Headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');

		const options = new RequestOptions({headers: headers});

		this.http.put('http://localhost:9900/api/category/' + id, serializedForm, options).subscribe
		(
			data => console.log('wyslane!', data),
			error => console.error('nie bangla', error)
		);
	}
}

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Product } from "../models/product";
import 'rxjs/add/operator/map';
import { AuthService } from 'ng2-ui-auth';

@Injectable()
export class UserService 
{
	constructor(private http: Http, private auth: AuthService) { }

	getUser() 
	{
		const headers: Headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
        headers.append('X-Auth-Token', this.auth.getToken());

		const options = new RequestOptions({headers: headers});

		return this.http.get('http://localhost:9900/user', options);
	}
}

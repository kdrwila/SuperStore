import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { JwtHttp, AuthService } from 'ng2-ui-auth';

@Component(
{
	selector: 'app-authenticate',
	templateUrl: '../views/blank.html'
})

export class AuthenticateComponent implements OnInit 
{
    provider: string;
  	private sub: any;

	constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

	ngOnInit() 
	{
        this.sub = this.route.params.subscribe(params =>
		{
			this.provider = params['provider'];
		});
        console.log(this.provider);

		// this.router.navigateByUrl('/signin')
	}

	ngOnDestroy() 
	{
    	this.sub.unsubscribe();
  	}
}

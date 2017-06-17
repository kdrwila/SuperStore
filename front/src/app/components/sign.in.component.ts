import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { JwtHttp, AuthService } from 'ng2-ui-auth';

@Component(
{
	selector: 'app-sign-in',
	templateUrl: '../views/sign.in.component.html',
	styleUrls: ['../css/main.component.css']
})

export class SignInComponent implements OnInit 
{
	constructor(private auth: AuthService, private router: Router) { }

	ngOnInit() 
	{
		
	}

	authenticate(provider) 
	{
		console.log("works");
		this.auth.authenticate(provider).subscribe(
		{
			error: (err: any) => console.log(err),
			complete: () => this.router.navigateByUrl('')
		});
  	};
}

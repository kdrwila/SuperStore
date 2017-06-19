import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { JwtHttp, AuthService } from 'ng2-ui-auth';

@Component(
{
	selector: 'app-sign-out',
	templateUrl: '../views/blank.html'
})

export class SignOutComponent implements OnInit 
{
	constructor(private auth: AuthService, private router: Router) { }

	ngOnInit() 
	{
		this.auth.logout().subscribe(
        {
            error: (err: any) =>
            {
                console.log(err);
                this.router.navigateByUrl('/')
            },
            complete: () => this.router.navigateByUrl('/')
        });
	}
}

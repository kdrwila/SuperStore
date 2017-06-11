import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component(
{
	selector: 'app-admin-main',
	templateUrl: '../views/admin.main.component.html',
	styleUrls: ['../css/admin.component.css']
})

export class AdminMainComponent implements OnInit 
{
	constructor(private route: ActivatedRoute) { }

	ngOnInit() 
	{

	}
}

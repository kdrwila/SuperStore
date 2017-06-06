import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { ActivatedRoute } from "@angular/router";

@Component(
{
	selector: 'app-category',
	templateUrl: '../views/category.component.html',
	styleUrls: ['../css/category.component.css']
})

export class CategoryComponent implements OnInit 
{
	id: number;
  	private sub: any;
	category: Category;

	constructor(private categoryService: CategoryService, private route: ActivatedRoute) { }

	ngOnInit() 
	{
		this.sub = this.route.params.subscribe(params =>
		{
			this.id = +params['id'];
		});

		this.categoryService.getCategory(this.id).subscribe
		(
			category => this.category = category
		);
	}

	ngOnDestroy() 
	{
    	this.sub.unsubscribe();
  	}
}

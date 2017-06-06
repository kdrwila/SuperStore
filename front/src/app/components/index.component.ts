import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';

@Component({
	selector: 'app-root',
	templateUrl: '../views/index.component.html',
	styleUrls: ['../css/index.component.css']
})

export class AppComponent implements OnInit
{
	title = 'Hello World!';
	categories: Category[];

	constructor(private categoryService: CategoryService) { }

	ngOnInit() 
	{
		this.categoryService.getCategories().subscribe(data => this.categories = data);
	}
}

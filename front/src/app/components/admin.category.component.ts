import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component(
{
	selector: 'app-admin-category',
	templateUrl: '../views/admin.category.component.html',
	styleUrls: ['../css/category.component.css']
})

export class AdminCategoryComponent implements OnInit 
{
	categories: Category[];
	categoryForm: FormGroup;
	addCategoryClicked: boolean = false;

	constructor(private categoryService: CategoryService, private route: ActivatedRoute) { }

	ngOnInit() 
	{
		this.categoryService.getCategories().subscribe(data => this.categories = data);

		this.categoryForm = new FormGroup(
		{
			tytul: new FormControl('', Validators.required),
			opis: new FormControl('', Validators.required)
		});
	}

	addCategory(event)
	{
		this.categoryService.sendToPlay(this.categoryForm.value).subscribe
		(
			data =>
			{
				this.categoryService.getCategories().subscribe(data => this.categories = data);
			},
			error => console.error('ERROR', error)
		);

		this.categoryForm.reset();
		this.addCategoryClicked = false;
	}

	removeCategory(id: number)
	{
		this.categoryService.removeCategory(id).subscribe
		(
			data =>
			{
				var basketProducts = this.categories;
				for(var p in this.categories)
				{
					if(this.categories[p].catId == id)
					{
						basketProducts.splice(parseInt(p), 1);
					}
				}
				this.categories = basketProducts;
			},
			error =>
			{
				console.error('ERROR', error);
			}
		);
	}

}

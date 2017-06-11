import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component(
{
	selector: 'app-product',
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
			tytul: new FormControl('tytul', Validators.required),
			opis: new FormControl('opis', Validators.required)
		});
	}

	addCategory(event)
	{
		this.categoryService.sendToPlay(this.categoryForm.value);

		this.addCategoryClicked = false;
	}

}

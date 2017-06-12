import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component(
{
	selector: 'app-admin-category-edit',
	templateUrl: '../views/admin.category.edit.component.html',
	styleUrls: ['../css/category.component.css']
})

export class AdminCategoryEditComponent implements OnInit 
{
	id: number;
  	private sub: any;
	category: any;
	categoryForm: FormGroup;

	constructor(private categoryService: CategoryService, private route: ActivatedRoute) { }

	ngOnInit() 
	{
        this.sub = this.route.params.subscribe(params =>
		{
			this.id = +params['id'];
		});

		this.categoryService.getCategory(this.id).subscribe(data =>
        {
            this.category = data

            this.categoryForm = new FormGroup(
            {
                tytul: new FormControl(this.category.category.tytul, Validators.required),
                opis: new FormControl(this.category.category.opis, Validators.required)
            });
        });
	}

	updateCategory(event) 
	{
		this.categoryService.updateCategory(this.categoryForm.value, this.id);
	}
}
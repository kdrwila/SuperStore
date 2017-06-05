import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from './category';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component(
{
	selector: 'app-product',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {

	categories: Category[];

	categoryForm: FormGroup;

	constructor(private categoryService: CategoryService, private route: ActivatedRoute) { }

	ngOnInit() 
	{
		this.categoryService.getCategories().subscribe(data => this.categories = data);

		this.categoryForm = new FormGroup(
		{
			tytul: new FormControl('tytul', Validators.required),
			opis: new FormControl('opis', Validators.required)
		});

		console.log(this.route.snapshot.params);
	}

	addCategory(event)
	{
		console.log(event);
		console.log(this.categoryForm.value);
		this.categoryService.sendToPlay(this.categoryForm.value);
	}

}

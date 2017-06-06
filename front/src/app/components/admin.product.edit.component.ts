import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component(
{
	selector: 'app-product',
	templateUrl: '../views/admin.product.edit.component.html',
	styleUrls: ['../css/product.component.css']
})

export class AdminProductEditComponent implements OnInit 
{
	id: number;
  	private sub: any;
	product: Product;
	categories: Category[];
	productForm: FormGroup;

	constructor(private productService: ProductService, private categoryService: CategoryService, private route: ActivatedRoute) { }

	ngOnInit() 
	{
        this.sub = this.route.params.subscribe(params =>
		{
			this.id = +params['id'];
		});

		this.productService.getProduct(this.id).subscribe(
        data =>
            {
                this.product = data;
                console.log(this.product);
                this.productForm = new FormGroup(
                {
                    tytul: new FormControl(this.product.tytul, Validators.required),
                    opis: new FormControl(this.product.opis, Validators.required),
                    catId: new FormControl(this.product.catId, Validators.required)
                });
            }
        );
		this.categoryService.getCategories().subscribe(data => this.categories = data);
	}

	// addProduct(event) 
	// {
	// 	console.log(event);
	// 	console.log(this.productForm.value);
	// 	this.productService.sendToPlay(this.productForm.value);
	// }
}
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
	product: any;
	categories: Category[];
	productForm: FormGroup;
	productTypeForm: FormGroup;

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
                    tytul: new FormControl(this.product.product.tytul, Validators.required),
                    opis: new FormControl(this.product.product.opis, Validators.required),
                    catId: new FormControl(this.product.product.catId, Validators.required)
                });

				this.productTypeForm = new FormGroup(
                {
                    title: new FormControl('', Validators.required),
                    price: new FormControl('', Validators.required),
                    quantity: new FormControl('', Validators.required)
                });
            }
        );
		this.categoryService.getCategories().subscribe(data => this.categories = data);
	}

	updateProduct(event) 
	{
		this.productService.updateProduct(this.productForm.value, this.id);
	}

	addType(event)
	{
		this.productService.addType(this.productTypeForm.value, this.id);
	}
}
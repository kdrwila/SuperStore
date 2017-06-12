import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { ProductType } from '../models/productType';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component(
{
	selector: 'app-admin-product-edit',
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
	addTypeClicked: boolean = false;

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
		this.productService.addType(this.productTypeForm.value, this.id).subscribe
		(
			data =>
			{
				this.productService.getProduct(this.id).subscribe(data => this.product = data);
			},
			error => console.error('ERROR', error)
		);

		this.productTypeForm.reset();
		this.addTypeClicked = false;
	}

	removeType(id: number)
	{
		this.productService.removeType(id, this.id);

		var types = this.product.types;

		var i = 0;
		this.product.types.forEach(function(type: ProductType)
		{
			if(type.type_id == id)
			{
				types.splice(i, 1);
			}
			i ++;
		});

		this.product.types = types;
	}
}
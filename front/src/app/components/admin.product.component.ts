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
	templateUrl: '../views/admin.product.component.html',
	styleUrls: ['../css/product.component.css']
})
export class AdminProductComponent implements OnInit 
{
	products: Product[];
	categories: Category[];
	productForm: FormGroup;

	constructor(private productService: ProductService, private categoryService: CategoryService, private route: ActivatedRoute) { }

	ngOnInit() 
	{
		this.productService.getProducts().subscribe(data => this.products = data);
		this.categoryService.getCategories().subscribe(data => this.categories = data);

		this.productForm = new FormGroup(
		{
			tytul: new FormControl('tytul', Validators.required),
			opis: new FormControl('opis', Validators.required),
			catId: new FormControl('catId', Validators.required)
		});

		console.log(this.route.snapshot.params);
	}

	addProduct(event) 
	{
		this.productService.sendToPlay(this.productForm.value);
	}

	removeProduct(id: number)
	{
		this.productService.removeProduct(id);

		var products = this.products;

		var i = 0;
		this.products.forEach(function(product)
		{
			if(product.prodId == id)
			{
				products.splice(i, 1);
			}
			i ++;
		});

		this.products = products;
	}
}

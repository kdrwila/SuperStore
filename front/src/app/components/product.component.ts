import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../components/index.component";
import { ProductService } from '../services/product.service';
import { BasketService } from '../services/basket.service';
import { CategoryService } from '../services/category.service';
import { Product } from '../models/product';
import { ProductType } from '../models/productType';
import { Category } from '../models/category';
import { ActivatedRoute } from "@angular/router";

@Component(
{
	selector: 'app-product',
	templateUrl: '../views/product.component.html',
	styleUrls: ['../css/product.component.css']
})

export class ProductComponent implements OnInit 
{
	id: number;
  	private sub: any;
	productData: any;
	selectedType: ProductType;
	categories: Category[];

	constructor(private productService: ProductService, private basketService: BasketService, private categoryService: CategoryService, private route: ActivatedRoute, private index: AppComponent) { }

	ngOnInit() 
	{
		this.sub = this.route.params.subscribe(params =>
		{
			this.id = +params['id'];
		});

		this.productService.getProduct(this.id).subscribe(data =>
		{
			this.productData = data;
			this.selectedType = this.productData.types[0];
		});

		this.categoryService.getCategories().subscribe(data => this.categories = data);
	}

	ngOnDestroy() 
	{
    	this.sub.unsubscribe();
  	}

	addProductToBasket(product: ProductType, amount: number)
	{
		this.basketService.addProductToBasket(product, -1, amount).subscribe
		(
			data =>
			{
				this.index.cartItemCount += 1;
			},
			error =>
			{
				console.error('ERROR', error);
			}
		);
	}

	getCategoryName(id: number)
	{
		for(var i in this.categories)
		{
			if(this.categories[i].catId == id)
			{
				return this.categories[i].tytul;
			}
		}
	}
}

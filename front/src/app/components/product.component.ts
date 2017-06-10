import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { BasketService } from '../services/basket.service';
import { Product } from '../models/product';
import { ProductType } from '../models/productType'
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

	constructor(private productService: ProductService, private basketService: BasketService, private route: ActivatedRoute) { }

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
	}

	ngOnDestroy() 
	{
    	this.sub.unsubscribe();
  	}

	addProductToBasket(product: ProductType)
	{
		this.basketService.addProductToBasket(product, -1);
	}
}

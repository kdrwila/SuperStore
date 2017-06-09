import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
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
	selectedTypePrice: number;

	constructor(private productService: ProductService, private route: ActivatedRoute) { }

	ngOnInit() 
	{
		this.sub = this.route.params.subscribe(params =>
		{
			this.id = +params['id'];
		});

		this.productService.getProduct(this.id).subscribe(data =>
		{
			this.productData = data;
			this.selectedTypePrice = this.productData.types[0].price;
		});
	}

	ngOnDestroy() 
	{
    	this.sub.unsubscribe();
  	}
}

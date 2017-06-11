import { Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basket.service';
import { ProductService } from '../services/product.service';
import { BasketProduct } from '../models/basketProduct';
import { ActivatedRoute } from "@angular/router";

@Component(
{
	selector: 'app-basket',
	templateUrl: '../views/basket.component.html',
	styleUrls: ['../css/basket.component.css']
})

export class BasketComponent implements OnInit 
{
	constructor(private basketService: BasketService, private productService: ProductService, private route: ActivatedRoute) { }

	basketProducts: BasketProduct[];
	totalCost: number = 0;

	ngOnInit() 
	{
		this.basketService.getProductsInBasket(-1).subscribe(data => 
		{
			this.basketProducts = data
			for(var p in this.basketProducts)
			{
				console.log(p);
				const x = p;
				this.productService.getProduct(this.basketProducts[p].product_id).subscribe(data =>
				{
					console.log(x);
					console.log(this.basketProducts[x]);
					this.basketProducts[x].product_data = data.product;
					for(var t in data.types)
					{
						if(data.types[t].type_id == this.basketProducts[x].type_id)
						{
							this.basketProducts[x].type_data = data.types[t];
							this.totalCost += this.basketProducts[x].type_data.price * this.basketProducts[x].quantity;
						}
					}
				});
			}
		});
	}

	ngOnDestroy() 
	{

  	}
}

import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../components/index.component";
import { BasketService } from '../services/basket.service';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { BasketProduct } from '../models/basketProduct';
import { ProductType } from '../models/productType';
import { ActivatedRoute } from "@angular/router";

@Component(
{
	selector: 'app-basket',
	templateUrl: '../views/basket.component.html',
	styleUrls: ['../css/basket.component.css']
})

export class BasketComponent implements OnInit 
{
	constructor(private basketService: BasketService, private productService: ProductService, private route: ActivatedRoute, private index: AppComponent, private userService: UserService) { }

	basketProducts: BasketProduct[];
	totalCost: number = 0;

	ngOnInit() 
	{
		this.userService.getUser().subscribe(data =>
		{
			var user: any = data;
			var email: string = JSON.parse(user._body).email;

			this.userService.getUserId(email).subscribe(data =>
			{
				var temp: any = data;
				var userId = JSON.parse(temp._body).id;

				this.basketService.getProductsInBasket(userId).subscribe(data => 
				{
					this.basketProducts = data
					for(var p in this.basketProducts)
					{
						const x = p;
						this.productService.getProduct(this.basketProducts[p].product_id).subscribe(data =>
						{
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
			});
		});
	}

	ngOnDestroy() 
	{

  	}

	removeProductFromBasket(id: number)
	{
		this.basketService.removeProductFromBasket(this.index.userId, id).subscribe
		(
			data =>
			{
				var basketProducts = this.basketProducts;
				for(var p in this.basketProducts)
				{
					if(this.basketProducts[p].id == id)
					{
						this.totalCost -= this.basketProducts[p].type_data.price * this.basketProducts[p].quantity;
						basketProducts.splice(parseInt(p), 1);
						this.index.cartItemCount -= 1;
					}
				}
				this.basketProducts = basketProducts;
			},
			error =>
			{
				console.error('ERROR', error);
			}
		);
	}

	addProductToBasket(product: BasketProduct, amount: number)
	{
		if(	product.quantity + amount > product.type_data.quantity ||
			product.quantity + amount < 1)
			return;

		var p: ProductType = new ProductType();
		p.product_id = product.product_id;
		p.type_id = product.type_id;

		this.basketService.addProductToBasket(p, this.index.userId, amount).subscribe
		(
			data =>
			{
				var basketProducts = this.basketProducts;
				for(var p in this.basketProducts)
				{
					if(this.basketProducts[p].id == product.id)
					{
						this.basketProducts[p].quantity += amount;
						this.totalCost += this.basketProducts[p].type_data.price * amount;
					}
				}
				this.basketProducts = basketProducts;
			},
			error =>
			{
				console.error('ERROR', error);
			}
		);
	}
}

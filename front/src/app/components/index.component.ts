import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { BasketService } from '../services/basket.service';
import { UserService } from '../services/user.service';
import { Category } from '../models/category';
import { ProductComponent } from "../components/product.component";
import { indexProvider } from "../providers/index.provider";
import { JwtHttp, AuthService } from 'ng2-ui-auth';

@Component({
	selector: 'app-root',
	templateUrl: '../views/index.component.html',
	styleUrls: ['../css/index.component.css'],
	providers: [indexProvider]
})

export class AppComponent implements OnInit
{
	title = 'SuperStore';
	categories: Category[];
	@Input()
	cartItemCount: number = 0;
	user: any;
	userId: number;

	constructor(private categoryService: CategoryService, private basketService: BasketService, private auth: AuthService, private userService: UserService) { }

	ngOnInit() 
	{
		this.categoryService.getCategories().subscribe(data => this.categories = data);
	
		console.log(this.auth.getPayload());

		this.userService.getUser().subscribe(data =>
		{
			this.user = data;
			this.user = JSON.parse(this.user._body);

			this.userService.getUserId(this.user.email).subscribe(data =>
			{
				var temp: any = data;
				this.userId = JSON.parse(temp._body).id;

				this.basketService.getProductsInBasket(this.userId).subscribe(data =>
				{
					this.cartItemCount = data.length;
				});
			},
			err =>{
				console.error(err);
			});
		},
		err =>{
			console.error(err);
		});
	}

	isAuthenticated()
	{
		return this.auth.isAuthenticated();
	}
}

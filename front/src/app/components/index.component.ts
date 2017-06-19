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
	cartItemCount: number = 1;

	constructor(private categoryService: CategoryService, private basketService: BasketService, private auth: AuthService, private userService: UserService) { }

	ngOnInit() 
	{
		this.categoryService.getCategories().subscribe(data => this.categories = data);
		this.basketService.getProductsInBasket(-1).subscribe(data =>
		{
			this.cartItemCount = data.length;
		});

		console.log(this.auth.getPayload());

		this.userService.getUser().subscribe(data =>
		{
			console.log(data);
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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from '../components/index.component';
import { AdminMainComponent } from '../components/admin.main.component';
import { AdminProductComponent } from '../components/admin.product.component';
import { AdminProductEditComponent } from '../components/admin.product.edit.component';
import { AdminCategoryComponent } from '../components/admin.category.component';
import { ProductComponent } from '../components/product.component';
import { CategoryComponent } from '../components/category.component';
import { BasketComponent } from '../components/basket.component';
import { RouterModule } from "@angular/router";
import { ProductService } from "../services/product.service";
import { CategoryService } from "../services/category.service";
import { BasketService } from "../services/basket.service";


@NgModule(
{
	declarations: 
	[
		AppComponent,
		AdminMainComponent,
		AdminProductComponent,
		AdminProductEditComponent,
		AdminCategoryComponent,
		CategoryComponent,
		ProductComponent,
		BasketComponent
	],
	imports: 
	[
		BrowserModule,
		HttpModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forRoot(
		[
			{ path: '.', component: AppComponent },
			{ path: 'admin', component: AdminMainComponent },
			{ path: 'admin/products', component: AdminProductComponent },
			{ path: 'admin/product/:id', component: AdminProductEditComponent },
			{ path: 'admin/categories', component: AdminCategoryComponent },
			{ path: 'category/:id', component: CategoryComponent },
			{ path: 'product/:id', component: ProductComponent },
			{ path: 'basket', component: BasketComponent },
			{ path: 'moreparams/:tytul/:opis', component: AdminProductComponent }
		])
	],
	providers: [ProductService, CategoryService, BasketService],
	bootstrap: [AppComponent]
})
export class AppModule { }

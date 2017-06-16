import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from '../components/index.component';
import { AdminMainComponent } from '../components/admin.main.component';
import { AdminProductComponent } from '../components/admin.product.component';
import { AdminProductEditComponent } from '../components/admin.product.edit.component';
import { AdminCategoryComponent } from '../components/admin.category.component';
import { AdminCategoryEditComponent } from '../components/admin.category.edit.component';
import { ProductComponent } from '../components/product.component';
import { CategoryComponent } from '../components/category.component';
import { BasketComponent } from '../components/basket.component';
import { SignInComponent } from '../components/sign.in.component';
import { RouterModule } from "@angular/router";
import { ProductService } from "../services/product.service";
import { CategoryService } from "../services/category.service";
import { BasketService } from "../services/basket.service";

import {Ng2UiAuthModule, CustomConfig} from 'ng2-ui-auth';

export const GOOGLE_CLIENT_ID = '******************************.apps.googleusercontent.com';
export class MyAuthConfig extends CustomConfig {
    defaultHeaders = {'Content-Type': 'application/json'};
    providers = {google: {clientId: GOOGLE_CLIENT_ID}};
}

@NgModule(
{
	declarations: 
	[
		AppComponent,
		AdminMainComponent,
		AdminProductComponent,
		AdminProductEditComponent,
		AdminCategoryComponent,
		AdminCategoryEditComponent,
		CategoryComponent,
		ProductComponent,
		BasketComponent,
		SignInComponent
	],
	imports: 
	[
		BrowserModule,
		HttpModule,
		FormsModule,
		ReactiveFormsModule,
		Ng2UiAuthModule.forRoot(MyAuthConfig),
		RouterModule.forRoot(
		[
			{ path: '.', component: AppComponent },
			{ path: 'admin', component: AdminMainComponent },
			{ path: 'admin/products', component: AdminProductComponent },
			{ path: 'admin/product/:id', component: AdminProductEditComponent },
			{ path: 'admin/categories', component: AdminCategoryComponent },
			{ path: 'admin/category/:id', component: AdminCategoryEditComponent },
			{ path: 'category/:id', component: CategoryComponent },
			{ path: 'product/:id', component: ProductComponent },
			{ path: 'basket', component: BasketComponent },
			{ path: 'signin', component: SignInComponent}
		])
	],
	providers: [ProductService, CategoryService, BasketService],
	bootstrap: [AppComponent]
})
export class AppModule { }

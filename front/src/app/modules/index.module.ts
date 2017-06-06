import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from '../components/index.component';
import { ProductComponent } from '../components/admin.product.component';
import { AdminCategoryComponent } from '../components/admin.category.component';
import { CategoryComponent } from '../components/category.component';
import { RouterModule } from "@angular/router";
import { ProductService } from "../services/product.service";
import { CategoryService } from "../services/category.service";


@NgModule(
{
	declarations: 
	[
		AppComponent,
		ProductComponent,
		AdminCategoryComponent,
		CategoryComponent
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
			{ path: 'admin/products', component: ProductComponent },
			{ path: 'admin/categories', component: AdminCategoryComponent },
			{ path: 'category/:id', component: CategoryComponent },
			{ path: 'moreparams/:tytul/:opis', component: ProductComponent }
		])
	],
	providers: [ProductService, CategoryService],
	bootstrap: [AppComponent]
})
export class AppModule { }

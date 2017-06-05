import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import {RouterModule} from "@angular/router";
import {ProductService} from "./product/product.service";


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '.', component: AppComponent},
      { path: 'products', component: ProductComponent},
      { path: 'moreparams/:tytul/:opis', component: ProductComponent}
      ])
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }

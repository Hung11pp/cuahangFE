import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';


import { ListProductComponent } from './list-product/list-product.component';
import { ListUserComponent } from './list-user/list-user.component';
import { ListOrderComponent } from './list-order/list-order.component';
import { UserFormComponent } from './user-form/user-form.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { ProductFormComponent } from './product-form/product-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListProductComponent,
    ListUserComponent,
    ListOrderComponent,
    UserFormComponent,
    OrderFormComponent,
    ProductFormComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

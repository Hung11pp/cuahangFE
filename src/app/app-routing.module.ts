import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListUserComponent } from './list-user/list-user.component';
import { ListOrderComponent } from './list-order/list-order.component';
import { ListProductComponent } from './list-product/list-product.component';
import { UserFormComponent } from './user-form/user-form.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { ProductFormComponent } from './product-form/product-form.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'Users', component:ListUserComponent},
  {path: 'user-form', component:UserFormComponent},
  {path: 'user-form/:id', component:UserFormComponent},
  {path: 'Orders', component:ListOrderComponent},
  {path: 'order-form', component:OrderFormComponent},
  {path: 'Products', component:ListProductComponent},
  {path: 'product-form', component:ProductFormComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListUserComponent } from './list-user/list-user.component';
import { ListOrderComponent } from './list-order/list-order.component';
import { ListProductComponent } from './list-product/list-product.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'Users', component:ListUserComponent},
  {path: 'user-form', component:UserFormComponent},
  {path: 'UserForm/:id', component:UserFormComponent},
  {path: 'Orders', component:ListOrderComponent},
  {path: 'Products', component:ListProductComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api-service.service';
import { User } from '../model/User';
import { Product } from '../model/Product';
import { Order } from '../model/Order';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  users: User[] = [];
  products: Product[] = [];

  constructor(private apiService: ApiService) {
    this.orderForm = new FormGroup({
      id: new FormControl('', Validators.required),
      orderDate: new FormControl('', Validators.required),
      totalPrice: new FormControl('', Validators.required),
      userId: new FormControl('', Validators.required),
      productIds: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadProducts();
  }

  loadUsers(): void {
    this.apiService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  loadProducts(): void {
    this.apiService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const order: Order = {
        id: this.orderForm.value.id,
        orderDate: this.orderForm.value.orderDate,
        totalPrice: this.orderForm.value.totalPrice,
        user: this.users.find(user => user.id === this.orderForm.value.userId)!,
        products: this.products.filter(product =>
          this.orderForm.value.productIds.includes(product.id)
        )
      };

      this.apiService.createOrder(order).subscribe(createdOrder => {
        console.log('New order created:', createdOrder);
      });
    }
  }
}

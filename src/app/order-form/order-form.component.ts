import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  orderId!: number;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.orderForm = new FormGroup({
      orderDate: new FormControl('', Validators.required),
      userId: new FormControl('', Validators.required),
      productIds: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadProducts();

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['id']) {
        this.orderId = +params['id']; // Ép kiểu sang kiểu number
      }
    });
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
        id: this.orderId || 0,
        totalPrice: 0,
        orderDate: this.orderForm.value['orderDate'],
        user: { id: this.orderForm.value['userId'] } as User,
        products: this.orderForm.value['productIds'].map((productId: number) => ({
          id: productId
        })) as Product[]
      };

      if (this.orderId) {
        this.apiService.updateOrder(this.orderId, order).subscribe(updatedOrder => {
          console.log('Order updated:', updatedOrder);
          this.router.navigate(['Orders']);
        });
      } else {
        this.apiService.createOrder(order).subscribe(createdOrder => {
          console.log('New order created:', createdOrder);
          this.router.navigate(['Orders']);
        });
      }
    }
  }

}

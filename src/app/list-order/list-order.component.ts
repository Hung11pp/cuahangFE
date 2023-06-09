import { Component, OnInit } from '@angular/core';
import { Order } from '../model/Order';
import { ApiService } from '../api-service.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-list-Order',
  templateUrl: './list-Order.component.html',
  styleUrls: ['./list-Order.component.css']
})
export class ListOrderComponent implements OnInit {
  Orders: Order[] = [];


  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getOrders();
  }
  sttCounter: number = 1;
  incrementCounter(): void {
    this.sttCounter++;
  }

  getOrders(): void {
    this.apiService.getAllOrders().subscribe(Orders => {
      this.Orders = Orders;
    });
  }

  createOrder(): void {
    this.router.navigate(['order-form']);
  }

  updateOrder(id: number, order: Order): void {
    this.router.navigate(['order-form'], { queryParams: { id: id } });

  }

  deleteOrder(id: number): void {
    this.apiService.deleteOrder(id).subscribe(() => {
      // Xử lý khi xóa Order thành công
      console.log('Order deleted');
      // Refresh danh sách Order
      this.getOrders();
    });
  }

  removeProductFromOrder(orderId: number, productId: number): void {
    this.apiService.removeProductFromOrder(orderId, productId).subscribe(updatedOrder => {
      // Xử lý khi xóa sản phẩm khỏi đơn hàng thành công
      console.log('Product removed from Order:', updatedOrder);
      // Refresh danh sách Order
      this.getOrders();
    });
  }
}

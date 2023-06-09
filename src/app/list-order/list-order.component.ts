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
  constructor(private apiService: ApiService,private router: Router) {}

  ngOnInit(): void {
    this.getOrders();
  }
  getOrders(): void {
    this.apiService.getAllOrders().subscribe(Orders => {
      this.Orders = Orders;
    });
  }
  addOrder(): void {
    this.router.navigate(['order-form']);
  }
  updateOrder(id: number, Order: Order): void {
    const navigationExtras: NavigationExtras = {
      queryParams: { id: id }
    };
    this.router.navigate(['order-form'], navigationExtras);

    this.apiService.updateOrder(id, Order).subscribe(updatedOrder => {
      // Xử lý khi cập nhật Order thành công
      console.log('Order updated:', updatedOrder);
      // Refresh danh sách Order
      this.getOrders();
    });
  }
  deleteOrder(id: number): void {
    this.apiService.deleteOrder(id).subscribe(() => {
      // Xử lý khi xóa Order thành công
      console.log('Order deleted');
      // Refresh danh sách Order
      this.getOrders();
    });
  }
}

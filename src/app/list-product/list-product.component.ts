import { Component, OnInit } from '@angular/core';
import { Product } from '../model/Product';
import { ApiService } from '../api-service.service';
import { Router } from '@angular/router';
import { Order } from '../model/Order';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  products: Product[] = [];
  Orders: Order[] = [];
  selectedOrderId: number = 0;
  searchControl = new FormControl('');


  constructor(private apiService: ApiService, private router: Router) {}

  sttCounter: number = 1;
  incrementCounter(): void {
    this.sttCounter++;
  }

  ngOnInit(): void {
    this.getProducts();
    this.getOrders();

    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(value => {
    this.searchProducts(value);
  });


  }

  getProducts(): void {
    this.apiService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  getOrders(): void {
    this.apiService.getAllOrders().subscribe(orders => {
      this.Orders = orders;
    });
  }

  createProduct(): void {
    this.router.navigateByUrl('/product-form');
  }

  updateProduct(id: number, product: Product): void {
    const queryParams = { id: id.toString() };
    const url = `/product-form?id=${queryParams.id}`;
    this.router.navigateByUrl(url);


  }

  deleteProduct(id: number): void {
    this.apiService.deleteProduct(id).subscribe(() => {
      // Xử lý khi xóa product thành công
      console.log('Product deleted');
      // Refresh danh sách product
      this.getProducts();
    });
  }

  addProductToOrder(id:number): void {
    this.apiService.addProductToOrder(this.selectedOrderId, id).subscribe(updatedOrder => {
      console.log('Product added to order:', updatedOrder);
      this.getProducts();
    });
  }
  searchProducts(name: string | null): void {
    const searchName = name || ''; // Chuyển đổi null thành chuỗi trống

    if (searchName.trim() !== '') {
      this.apiService.searchProductsByName(searchName).subscribe(products => {
        this.products = products;
      });
    } else {
      // Nếu không có tên sản phẩm được nhập, hiển thị tất cả sản phẩm
      this.getProducts();
    }
  }

}

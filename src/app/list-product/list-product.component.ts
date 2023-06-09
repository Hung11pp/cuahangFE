import { Component, OnInit } from '@angular/core';
import { Product } from '../model/Product';
import { ApiService } from '../api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.apiService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  addProduct(): void {
    this.router.navigateByUrl('/product-form');
  }

  updateProduct(id: number, product: Product): void {
    const queryParams = { id: id.toString() };
    const url = `/product-form?id=${queryParams.id}`;
    this.router.navigateByUrl(url);

    this.apiService.updateProduct(id, product).subscribe(updatedProduct => {
      // Xử lý khi cập nhật product thành công
      console.log('Product updated:', updatedProduct);
      // Refresh danh sách product
      this.getProducts();
    });
  }

  deleteProduct(id: number): void {
    this.apiService.deleteProduct(id).subscribe(() => {
      // Xử lý khi xóa product thành công
      console.log('Product deleted');
      // Refresh danh sách product
      this.getProducts();
    });
  }
}

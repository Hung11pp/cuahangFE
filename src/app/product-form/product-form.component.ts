import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api-service.service';
import { Product } from '../model/Product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  productForm: FormGroup;
  productId: number | undefined;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      price: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.productId = params['id'];
      if (this.productId) {
        this.apiService.getProductById(this.productId).subscribe(product => {
          this.productForm.setValue({
            id: product.id,
            name: product.name,
            price: product.price
          });
        });
      }
    });
  }

  onSubmit(): void {
    const product: Product = this.productForm.value;
    if (this.productId) {
      this.apiService.updateProduct(this.productId, product).subscribe(updatedProduct => {
        console.log('Product updated:', updatedProduct);
        this.router.navigate(['Products']);
      });
    } else {
      this.apiService.createProduct(product).subscribe(createdProduct => {
        console.log('New product created:', createdProduct);
        this.router.navigate(['Products']);
      });
    }
  }

  goBack(): void {
    this.router.navigate(['Products']);
  }
}

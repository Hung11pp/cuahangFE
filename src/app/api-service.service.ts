import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './model/User';
import { Order } from './model/Order';
import { Product } from './model/Product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:1107/api/v1/';

  constructor(private http: HttpClient) {}

  // Các phương thức để gửi yêu cầu HTTP đến API backend
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'users', user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl + 'users/' + id, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'users/' + id);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + 'orders');
  }
  getOrderById(id:number): Observable<Order>{
    return this.http.get<Order>(this.baseUrl + 'orders/' + id);
  }
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl + 'orders', order);
  }
  updateOrder(id: number, order: Order): Observable<Order> {
    return this.http.put<Order>(this.baseUrl + 'orders/' + id, order);
  }
  deleteOrder(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'orders/' + id);
  }
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'products');
  }
  getProductById(id:number): Observable<Product>{
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + 'products', product);
  }
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(this.baseUrl + 'products/' + id, product);
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'products/' + id);
  }
  searchProductsByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'products/search', { params: { name } });
  }
  addProductToOrder(orderId: number, productId: number): Observable<Order> {
    return this.http.post<Order>(this.baseUrl + `orders/${orderId}/products/${productId}`, null);
  }



}

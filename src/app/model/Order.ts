import { User } from './User';
import { Product } from './Product';
export interface Order {
  id: number;
  orderDate: Date;
  totalPrice: number;
  user: User;
  products: Product[];
}

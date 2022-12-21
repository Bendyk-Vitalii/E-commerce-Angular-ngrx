import { CartItem } from './cart.model';
import { Product } from './product.model';

export interface AppStateInterface {
  products: Product[];
  cartItems: CartItem[];
}

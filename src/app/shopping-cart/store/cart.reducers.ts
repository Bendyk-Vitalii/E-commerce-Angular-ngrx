import { CartItem } from '@pages/shopping-cart/cart.interface';

export interface State {
  shoppingCartList: ReadonlyArray<CartItem>;
}

const initialState: State = {
  shoppingCartList: [],
};

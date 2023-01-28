import { CartItem } from 'src/app/models/cart.model';

export interface State {
  shoppingCartList: ReadonlyArray<CartItem>;
}

const initialState: State = {
  shoppingCartList: [],
};

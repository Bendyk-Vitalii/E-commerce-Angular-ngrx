import { Product } from './../models/product.model';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromProducts from '../store/products/products.reducer';

// export interface State {
//   products: fromProducts.State;
// }

// export const reducers: ActionReducerMap<State> = {
//   products: fromProducts.productsReducer,
// };

// export const metaReducers: MetaReducer<State>[] = !environment.production
//   ? []
//   : [];

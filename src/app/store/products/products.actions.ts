import { createActionGroup, props } from '@ngrx/store';
import { CartItem, Product } from '@models';

export const ProductsApiActions = createActionGroup({
  source: 'Products API',
  events: {
    'Retrieved Products List': props<{ products: ReadonlyArray<Product> }>(),
  },
});

import { createActionGroup, props } from '@ngrx/store';
import { Product } from '@models';

export const ProductsApiActions = createActionGroup({
  source: 'Products API',
  events: {
    'Retrieved Products List': props<{ products: ReadonlyArray<Product> }>(),
  },
});

export const CategoriesApiActions = createActionGroup({
  source: 'Products API',
  events: {
    'Retrieved Categories List': props<{ categories: ReadonlyArray<string> }>(),
  },
});

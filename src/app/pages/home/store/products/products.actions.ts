import { createActionGroup, props } from '@ngrx/store';
import { Product } from '@shared/product.interface';

export const ProductsApiActions = createActionGroup({
  source: 'Products API',
  events: {
    'Retrieved Products List': props<any>(),
    'Loaded Success': props<{ products: ReadonlyArray<Product> }>(),
    'Loaded Error': (error: any) => ({ error }),
  },
});

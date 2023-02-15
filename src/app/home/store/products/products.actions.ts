import { createActionGroup, props } from '@ngrx/store';
import { Product } from '@shared/interface/product.interface';

export const ProductsApiActions = createActionGroup({
  source: 'Products API',
  events: {
    'Products List Request': props<{count: string, sort: string, category?: string}>(),
    'Loaded Success': props<{ products: ReadonlyArray<Product> }>(),
    'Loaded Error': (error: any) => ({ error }),
  },
});

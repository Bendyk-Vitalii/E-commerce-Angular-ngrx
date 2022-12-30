import { createActionGroup, props } from '@ngrx/store';
import { Product } from '@models';

export enum ProductsActionTypes {
  Load = '[Products API] Retrieved Products List',
  LoadSuccess = '[Products API] Loaded Success',
  LoadError = '[Products API] Loaded Error',
}

export const ProductsApiActions = createActionGroup({
  source: 'Products API',
  events: {
    'Retrieved Products List': props<any>(),
    'Loaded Success': props<{ products: ReadonlyArray<Product> }>(),
    'Loaded Error': (error: any) => ({ error }),
  },
});

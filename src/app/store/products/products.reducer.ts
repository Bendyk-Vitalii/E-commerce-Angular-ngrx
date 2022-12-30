import { ProductsApiActions, CategoriesApiActions } from './products.actions';
import { createReducer, on } from '@ngrx/store';

import { Product } from './../../models/product.model';

export const initialProductsState: ReadonlyArray<Product> = [];
export const initialCategoriesState: ReadonlyArray<string> = [];

export const productsReducer = createReducer(
  initialProductsState,
  on(
    ProductsApiActions.retrievedProductsList,
    (_state, { products }) => products
  )
);

export const categoriesReducer = createReducer(
  initialCategoriesState,
  on(
    CategoriesApiActions.retrievedCategoriesList,
    (_state, { categories }) => categories
  )
);

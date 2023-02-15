import { PRODUCTS_FEATURE_KEY } from "@home/store/products/products.reducer";
import { Product } from "@shared/interface/product.interface";

export interface ProductsPartialState {
  readonly [PRODUCTS_FEATURE_KEY]: ProductsState;
}

export interface ProductsState {
  products: ReadonlyArray<Product>;
};

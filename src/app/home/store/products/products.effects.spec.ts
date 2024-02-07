import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';

import { ProductsApiActions } from './products.actions';
import { ProductEffects } from './products.effects';
import { ApiService } from '@shared/services/api.service';
import { Product } from '@shared';

describe('Product Effects', () => {
  let effects: ProductEffects;
  let actions$: Observable<any>;
  let apiService: jasmine.SpyObj<ApiService>;
  const product1 = {
    id: 1,
    title: 'Product Title 1',
    price: 10.0,
    category: 'Category A',
    description: 'Product Description 1',
    image: 'product-image-1.jpg',
  } as Product;

  const product2 = {
    id: 2,
    title: 'Product Title 2',
    price: 10.0,
    category: 'Category A',
    description: 'Product Description 2',
    image: 'product-image-2.jpg',
  } as Product;

  const count = '12';
  const sort = 'desc';
  const category = 'electronics';

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['getProducts']);

    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        provideMockActions(() => actions$),
        { provide: ApiService, useValue: spy },
      ],
    });

    effects = TestBed.inject(ProductEffects);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  describe('loadProducts', () => {
    it('should return a productsApiActions.loadedSuccess, with the products, on success', () => {
      const action = ProductsApiActions.productsListRequest({
        count,
        sort,
        category,
      });
      const products = [product1, product2];
      const completion = ProductsApiActions.loadedSuccess({ products });

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: products });
      apiService.getProducts.and.returnValue(response);
      const expected = cold('--c', { c: completion });

      expect(effects.loadProducts$).toBeObservable(expected);
      expect(apiService.getProducts).toHaveBeenCalledWith(
        count,
        sort,
        category
      );
    });

    it('should return a productsApiActions.loadedError, with the error, on failure', () => {
      const action = ProductsApiActions.productsListRequest({
        count,
        sort,
        category,
      });
      const error = new Error('An error occurred');
      const completion = ProductsApiActions.loadedError({ error });

      actions$ = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      apiService.getProducts.and.returnValue(response);
      const expected = cold('--c', { c: completion });

      expect(effects.loadProducts$).toBeObservable(expected);
      expect(apiService.getProducts).toHaveBeenCalledWith(
        count,
        sort,
        category
      );
    });
  });
});



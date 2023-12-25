// import { TestBed } from '@angular/core/testing';
// import { provideMockActions } from '@ngrx/effects/testing';
// import { Observable, of } from 'rxjs';
// import { hot, cold } from 'jasmine-marbles';

// import { ProductsApiActions } from './products.actions';
// import { ProductEffects } from './products.effects';
// import { ApiService } from '@shared/services/Api.service';
// import { Product } from '@shared';

// describe('Product Effects', () => {
//   let effects: ProductEffects;
//   let actions$: Observable<any>;
//   let apiService: jasmine.SpyObj<ApiService>;
//   const product1 = {
//     id: 1,
//     title: 'Product Title 1',
//     price: 10.0,
//     category: 'Category A',
//     description: 'Product Description 1',
//     image: 'product-image-1.jpg',
//   } as Product;

//   const product2 = {
//     id: 2,
//     title: 'Product Title 2',
//     price: 10.0,
//     category: 'Category A',
//     description: 'Product Description 2',
//     image: 'product-image-2.jpg',
//   } as Product;

//   const count = '12';
//   const sort = 'desc';
//   const category = 'electronics';

//   beforeEach(() => {
//     const spy = jasmine.createSpyObj('ApiService', ['getProducts']);

//     TestBed.configureTestingModule({
//       providers: [
//         ProductEffects,
//         provideMockActions(() => actions$),
//         { provide: ApiService, useValue: spy },
//       ],
//     });

//     effects = TestBed.inject(ProductEffects);
//     apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
//   });

//   describe('loadProducts', () => {
//     it('should return a productsApiActions.loadedSuccess, with the products, on success', () => {
//       const action = ProductsApiActions.productsListRequest({
//         count,
//         sort,
//         category,
//       });
//       const products = [product1, product2];
//       const completion = ProductsApiActions.loadedSuccess({ products });

//       actions$ = hot('-a', { a: action });
//       const response = cold('-a|', { a: products });
//       apiService.getProducts.and.returnValue(response);
//       const expected = cold('--c', { c: completion });

//       expect(effects.loadProducts$).toBeObservable(expected);
//       expect(apiService.getProducts).toHaveBeenCalledWith(
//         count,
//         sort,
//         category
//       );
//     });

//     it('should return a productsApiActions.loadedError, with the error, on failure', () => {
//       const action = ProductsApiActions.productsListRequest({
//         count,
//         sort,
//         category,
//       });
//       const error = new Error('An error occurred');
//       const completion = ProductsApiActions.loadedError({ error });

//       actions$ = hot('-a', { a: action });
//       const response = cold('-#|', {}, error);
//       apiService.getProducts.and.returnValue(response);
//       const expected = cold('--c', { c: completion });

//       expect(effects.loadProducts$).toBeObservable(expected);
//       expect(apiService.getProducts).toHaveBeenCalledWith(
//         count,
//         sort,
//         category
//       );
//     });
//   });
// });





// // import { TestBed } from '@angular/core/testing';
// // import { provideMockActions } from '@ngrx/effects/testing';
// // import { Observable } from 'rxjs';
// // import { hot, cold } from 'jasmine-marbles';

// // import { ProductsApiActions } from './products.actions';
// // import { ProductEffects } from './products.effects';
// // import { ApiService } from '@shared/services/Api.service';
// // import { Product } from '@shared';

// // describe('Product Effects', () => {
// //   let effects: ProductEffects;
// //   let actions$: Observable<any>;
// //  // let apiService: jasmine.SpyObj<ApiService>;
// //   const product1 = {
// //     id: 1,
// //     title: 'Product Title 1',
// //     price: 10.0,
// //     category: 'Category A',
// //     description: 'Product Description 1',
// //     image: 'product-image-1.jpg',
// //   } as Product;

// //   const product2 = {
// //     id: 2,
// //     title: 'Product Title 2',
// //     price: 10.0,
// //     category: 'Category A',
// //     description: 'Product Description 2',
// //     image: 'product-image-2.jpg',
// //   } as Product;

// //   const count = '12';
// //   const sort = 'desc';
// //   const category = 'electronics';

// //   beforeEach(() => {
// //     // const spy = jasmine.createSpyObj('ApiService', ['getProducts']);

// //     TestBed.configureTestingModule({
// //       providers: [
// //         ProductEffects,

// //         provideMockActions(() => actions$),
// //       ],
// //     });

// //     effects = TestBed.inject(ProductEffects);
// //     //apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;

// //     // spyOn(apiService, 'getProducts').and.returnValue(of(products));
// //   });
// //   describe('loadProducts', () => {
// //     it('should return a productsApiActions.loadedSuccess, with the products, on success', () => {
// //       const action = ProductsApiActions.productsListRequest({
// //         count,
// //         sort,
// //         category,
// //       });
// //       const completion = ProductsApiActions.loadedSuccess({
// //         products: [product1, product2],
// //       });

// //       actions$ = hot('-a', { a: action });
// //       //const response = cold('-a|', { a: [product1, product2] });
// //       const expected = cold('--c', { c: completion });

// //       expect(effects.loadProducts$).toBeObservable(expected);
// //     });
// //   });
// // });

// // afterEach(() => {
// //   spyOn(apiService, 'getProducts').calls.reset();
// // });

// //     const action = ProductsApiActions.productsListRequest({  count, sort, category });
// //     const completion = ProductsApiActions.loadedSuccess({ products });

// //     spyOn(apiService, 'getProducts').and.returnValue(of(products));

// //     actions$ = hot('-a', { a: action });
// //     const expected = cold('-b', { b: completion });

// //     expect(effects.loadProducts$).toBeObservable(expected);
// //     expect(apiService.getProducts).toHaveBeenCalledWith(count, sort, category);
// //   });

// //   it('should handle error when loading products', () => {
// //     const error = new Error('Something went wrong');

// //     const count = '10';
// //     const sort = 'name';
// //     const category = 'electronics';

// //     const action = ProductsApiActions.productsListRequest({ count, sort, category });
// //     const completion = ProductsApiActions.loadedError({ error });

// //     spyOn(apiService, 'getProducts').and.returnValue(throwError({ error }));

// //     actions$ = hot('-a', { a: action });
// //     const expected = cold('-b', { b: completion });

// //     expect(effects.loadProducts$).toBeObservable(expected);
// //     expect(apiService.getProducts).toHaveBeenCalledWith(count, sort, category);
// //   }
// // }

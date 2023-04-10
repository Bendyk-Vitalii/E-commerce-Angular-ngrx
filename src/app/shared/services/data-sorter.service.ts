import { Injectable } from '@angular/core';
import { Product } from '@shared/interface';

@Injectable({
  providedIn: 'root',
})
export class DataSorterService {


  filterForSearch(
    filteredArray: ReadonlyArray<Product>,
    filterValue: string
  ): ReadonlyArray<Product> {
    const filteredProductsArray = filteredArray.filter((product) =>
      product.title.toLowerCase().includes(filterValue.toLowerCase())
    );

   return filteredProductsArray;
  }

  sortByPrice(
    arrayForSort: ReadonlyArray<Product>,
    sortBy: string
  ): ReadonlyArray<Product> {
    const arrayCopy = [...arrayForSort]
    const compareNumbers =  (a: Product, b: Product) =>  a.price - b.price
    const sortededProductsArray = arrayCopy.sort(compareNumbers);

    sortBy === 'price-high-low' ? sortededProductsArray.reverse() : null

   return sortededProductsArray as ReadonlyArray<Product>;
  }

}




// import { Injectable } from '@angular/core';
// import { of, Observable } from 'rxjs';

// import { Filterable, Product } from '@shared/interface/product.interface';

// @Injectable({
//   providedIn: 'root',
// })
// export class DataSorterService {
//  public filterByProperty<T extends Filterable<string>>(
//     filteredArray: ReadonlyArray<T>,
//     propertyName: string,
//     filterValue: string
//   ): Observable<T[]> {
//     let filteredArrayResult: T[] = [];
//     if (!filterValue) {
//       filteredArrayResult = [...filteredArray];
//     } else {
//       filteredArrayResult = filteredArray.filter((value: T) => {
//         const propertyValue = value[propertyName]?.toString().toLowerCase();
//         return (
//           propertyValue &&
//           propertyValue.indexOf(filterValue.toLowerCase()) !== -1
//         );
//       });
//       console.log(filteredArrayResult)
//     }
//     return of(filteredArrayResult);
//   }

//  public convertProductsToFilterableHelper(products: ReadonlyArray<Product>): ReadonlyArray<Filterable<string>> {
//     return products.map(product => {
//       const filterableProduct: Filterable<string> = {
//         id: product.id.toString(),
//         title: product.title,
//         category: product.category,
//         description: product.description,
//         price: product.price.toString(),
//         image: product.image,
//       };
//       return filterableProduct;
//     });
//   }

// }

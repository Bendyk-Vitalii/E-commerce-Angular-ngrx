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


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { STORE_BASE_URL } from 'src/app/shared/constants';
import { Product } from './../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public Products$$ = new BehaviorSubject<Product[]>([]);
  constructor(private httpClient: HttpClient) {}

  public getAllProducts(
    limit = '12',
    sort = 'desc',
    category?: string
  ): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${STORE_BASE_URL}/products${
        category ? '/category/' + category : ''
      }?sort=${sort}&limit=${limit}`
    );
  }

  public getAllCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${STORE_BASE_URL}/products/categories`
    );
  }
}

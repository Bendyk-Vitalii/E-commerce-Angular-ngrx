import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Product } from '@shared/interface/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public getProducts(
    limit = '12',
    sort = 'desc',
    category?: string
  ): Observable<ReadonlyArray<Product>> {
    return this.httpClient
      .get<Product[]>(
        `${environment.fakeStoreApiUrl}/products${
          category ? '/category/' + category : ''
        }?sort=${sort}&limit=${limit}`
      )
      .pipe(map((products: ReadonlyArray<Product>) => products));
  }

  public getCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${environment.fakeStoreApiUrl}/products/categories`
    );
  }
}

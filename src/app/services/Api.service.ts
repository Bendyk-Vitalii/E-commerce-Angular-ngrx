import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { STORE_BASE_URL } from '@shared';
import { Product } from '@shared/product.interface';

interface HttpClientGetOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      }
    | undefined;
  context?: HttpContext | undefined;
  observe?: 'body' | undefined;
  params?: HttpParams;
  reportProgress?: boolean | undefined;
  responseType?: 'json' | undefined;
  withCredentials?: boolean | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public getProducts(
    limit = '12',
    sort = 'desc',
    category?: string
  ): Observable<Array<Product>> {
    return this.httpClient
      .get<Product[]>(
        `${STORE_BASE_URL}/products${
          category ? '/category/' + category : ''
        }?sort=${sort}&limit=${limit}`
      )
      .pipe(map((products) => products));
  }

  public getCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${STORE_BASE_URL}/products/categories`
    );
  }
}

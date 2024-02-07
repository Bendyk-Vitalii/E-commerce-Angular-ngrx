import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

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
      .pipe(map((products: ReadonlyArray<Product>) => products),
      catchError(this.handleError)
      );
  }

  public getCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${environment.fakeStoreApiUrl}/products/categories`
    )
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerOverlayService } from './load-overlay.service';


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private readonly loadOverlayService: SpinnerOverlayService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const loadSubscription: Subscription =
      this.loadOverlayService.spinner$.subscribe();
    return next
      .handle(req)
      .pipe(finalize(() => loadSubscription.unsubscribe()));
  }
}

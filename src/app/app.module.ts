import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule as MatMenuModule } from '@angular/material/menu';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule as MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from '@auth/auth.module';
import { CartModule } from '@shopping-cart/page/cart.module';
import {
  cartReducer,
  CART_FEATURE_KEY,
} from '@shopping-cart/store/cart.reducers';
import { CartFacade } from '@shopping-cart/store/cart.facade';
import { HomeModule } from '@home/page/home.module';
import { HeaderComponent, LayoutContainerComponent } from '@layouts';
import { SpinnerInterceptor } from '@core/load-interceptor/load-overlay.interceptor';
import { MenuService } from '@shared/services/open-menu.service';
@NgModule({
  declarations: [AppComponent, HeaderComponent, LayoutContainerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatGridListModule,
    MatButtonModule,
    MatExpansionModule,
    MatToolbarModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatIconModule,
    MatMenuModule,
    AuthModule,
    HomeModule,
    CartModule,
    StoreModule.forRoot({ [CART_FEATURE_KEY]: cartReducer }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    CartFacade,
    MenuService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

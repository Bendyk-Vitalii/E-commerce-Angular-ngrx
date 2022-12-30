import { ProductEffects } from './store/products/products.effects';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeModule } from './pages/home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '@components/header';
import { PageNotFoundComponent } from '@pages/page-not-found';
import { LayoutComponent } from '@layout';
import { FooterComponent } from '@components/footer';
import { PhoneNavbarComponent } from '@components/phone-navbar';
import { SharedModule } from '@shared';
import { AuthModule } from '@pages/auth';
import {
  productsReducer,
  categoriesReducer,
} from './store/products/products.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PhoneNavbarComponent,
    FooterComponent,
    LayoutComponent,
    PageNotFoundComponent,
  ],
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
    SharedModule,
    AuthModule,
    HomeModule,
    StoreModule.forRoot({
      products: productsReducer,
      categories: categoriesReducer,
    }),
    EffectsModule.forRoot([ProductEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),

    // StoreModule.forRoot(reducers, {
    //   metaReducers,
    // }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

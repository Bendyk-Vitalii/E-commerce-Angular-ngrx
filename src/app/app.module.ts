import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
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
import { AuthModule } from '@pages/auth';

import { environment } from '../environments/environment';
import { ProductEffects } from '@pages/home/store/products/products.effects';
import { appReducer } from './store/app.reducer';
import { CategoriesEffects } from '@pages/home/store/categories/categories.effects';

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
    AuthModule,
    HomeModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([ProductEffects, CategoriesEffects]),
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

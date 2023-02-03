import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@shared';
import { ProductBoxComponent } from './components/product-box/product-box.component';
import { HomeComponent } from './home.component';
import { FiltersComponent, ProductsHeaderComponent } from './components';
import { productsReducer, PRODUCTS_FEATURE_KEY } from './store/products/products.reducer';
import { ProductEffects } from './store/products/products.effects';
import { CategoriesEffects } from './store/categories/categories.effects';
import { categoriesReducer, CATEGORIES_FEATURE_KEY } from './store/categories/categories.reducer';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    FiltersComponent,
    ProductBoxComponent,
    ProductsHeaderComponent,
  ],
  imports: [
    SharedModule,
    MatSidenavModule,
    MatMenuModule,
    MatGridListModule,
    MatButtonModule,
    MatExpansionModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatCardModule,
    MatSnackBarModule,
    MatListModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(PRODUCTS_FEATURE_KEY, productsReducer),
    StoreModule.forFeature(CATEGORIES_FEATURE_KEY, categoriesReducer),
    EffectsModule.forFeature([ProductEffects, CategoriesEffects])
  ],
})
export class HomeModule {}

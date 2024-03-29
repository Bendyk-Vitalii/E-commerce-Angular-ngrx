import { MatCardModule as MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule as MatMenuModule } from '@angular/material/menu';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule as MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule as MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule as MatTooltipModule } from '@angular/material/tooltip';

import { SharedModule } from '@shared';
import { HomeComponent } from './home.component';
import { FiltersComponent } from '@home/ui/filters';
import { ProductBoxComponent } from '@home/ui/product-box';
import { ProductsHeaderComponent } from '@home/ui/products-header';
import {
  productsReducer,
  PRODUCTS_FEATURE_KEY,
} from '@home/store/products/products.reducer';
import {
  categoriesReducer,
  CATEGORIES_FEATURE_KEY,
} from '@home/store/categories/categories.reducer';
import { CategoriesEffects } from '@home/store/categories/categories.effects';
import { ProductEffects } from '@home/store/products/products.effects';
import { ProductsFacade } from '@home/store/products/products.facade';
import { CategoriesFacade } from '@home/store/categories/categories.facade';
import { ProductModalComponent } from '@home/ui/product-modal/product-modal.component';

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
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatGridListModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatBadgeModule,
    MatCardModule,
    MatSnackBarModule,
    MatListModule,
    MatButtonToggleModule,
    ProductModalComponent,
    RouterModule.forChild(routes),
    StoreModule.forFeature(PRODUCTS_FEATURE_KEY, productsReducer),
    StoreModule.forFeature(CATEGORIES_FEATURE_KEY, categoriesReducer),
    EffectsModule.forFeature([ProductEffects, CategoriesEffects]),
  ],
  providers: [ProductsFacade, CategoriesFacade],
})
export class HomeModule {}

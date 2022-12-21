import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';

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

import { ProductEffects } from './../../store/products/products.effects';
import { SharedModule } from '@shared';
import { RouterModule, Routes } from '@angular/router';
// import { ProductsHeaderComponent } from './components/products-header/products-header.component';
import { ProductBoxComponent } from './components/product-box/product-box.component';
import { HomeComponent } from './home.component';

import { FiltersComponent, ProductsHeaderComponent } from './components';
import { CartComponent } from '@pages/shopping-cart';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    CartComponent,
    FiltersComponent,
    ProductBoxComponent,
    ProductsHeaderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatGridListModule,
    MatButtonModule,
    MatExpansionModule,
    MatToolbarModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatListModule,
    EffectsModule.forFeature([ProductEffects]),
    RouterModule.forChild(routes),
  ],
})
export class HomeModule {}

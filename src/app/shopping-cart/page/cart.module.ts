import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { SharedModule } from '@shared';
import { CartComponent } from './cart.component';
import { ErrorPageLayoutComponent } from '@layouts';
import { CartEffects } from '@shopping-cart/store/cart.effects';
import {
  cartReducer,
  CART_FEATURE_KEY,
} from '@shopping-cart/store/cart.reducers';

const routes: Routes = [
  {
    path: '',
    component: CartComponent,
  },
];

@NgModule({
  declarations: [CartComponent],
  imports: [
    SharedModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ErrorPageLayoutComponent,
    RouterModule.forChild(routes),
    StoreModule.forFeature(CART_FEATURE_KEY, cartReducer),
    EffectsModule.forFeature([CartEffects]),
  ],
})
export class CartModule {}

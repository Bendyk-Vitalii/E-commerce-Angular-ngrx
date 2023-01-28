import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

import { MatCardModule } from '@angular/material/card';
import { CartComponent } from '@pages/shopping-cart';

import { SharedModule } from '@shared';
import { ErrorPageLayoutComponent } from '@layouts';

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
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    ErrorPageLayoutComponent,
    RouterModule.forChild(routes),
  ],
})
export class CartModule {}

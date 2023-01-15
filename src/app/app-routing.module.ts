import { HomeModule } from './pages/home/home.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './pages/page-not-found';
import { CartComponent } from './pages/shopping-cart';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home/home.module').then((x) => x.HomeModule),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./pages/shopping-cart/cart.module').then((x) => x.CartModule),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    loadChildren: () => import('./pages/auth').then((x) => x.AuthModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

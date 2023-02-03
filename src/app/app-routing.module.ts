import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@pages/auth/guards';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home/home.module').then((mod) => mod.HomeModule),
      },
      {
        path: 'cart',
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import('./pages/shopping-cart/cart.module').then(
            (mod) => mod.CartModule
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth').then((mod) => mod.AuthModule),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/page-not-found/page-not-found.component').then(
        (mod) => mod.PageNotFoundComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy: PreloadAllModules,

  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

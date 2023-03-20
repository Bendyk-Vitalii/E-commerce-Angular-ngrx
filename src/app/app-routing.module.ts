import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


import { AppRouteEnum } from '@shared/enums/router-enum';
import { AuthGuardService } from './auth/guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: AppRouteEnum.home,
        loadChildren: () =>
          import('./home/page/home.module').then((mod) => mod.HomeModule),
      },
      {
        path: AppRouteEnum.cart,
        //canActivate: [AuthGuardService],
        loadChildren: () =>
          import('./shopping-cart/page/cart.module').then(
            (mod) => mod.CartModule
          ),
      },
      {
        path: '',
        redirectTo: AppRouteEnum.home,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: AppRouteEnum.auth,
    loadChildren: () => import('./auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./page-not-found/page-not-found.component').then(
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

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'produtos/:id',
    loadChildren: () => import('./produtos/produtos.module').then(m => m.ProdutosPageModule)
  },
  {
    path: 'produto-detail/:id',
    loadChildren: './produto-detail/produto-detail.module#ProdutoDetailPageModule'
  },
  {
    path: 'cart',
    loadChildren: './cart/cart.module#CartPageModule'
  },
  {
    path: 'pick-address',
    loadChildren: './pick-address/pick-address.module#PickAddressPageModule'
  },
  {
    path: 'payment',
    loadChildren: './payment/payment.module#PaymentPageModule'
  },
  { path: 'order-confirmation',
   loadChildren: './order-confirmation/order-confirmation.module#OrderConfirmationPageModule'
   },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

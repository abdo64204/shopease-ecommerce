import { Component } from '@angular/core';
import { RouterLink, Routes } from '@angular/router';
import { Home } from './home/home';
import { ProductsPage } from './products-page/products-page';
import { Cart } from './cart/cart';
import { ProductDetails } from './product-details/product-details';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { authGuard } from '../gurdes/auth.guard';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="container" style="padding-block: 5rem; text-align: center" aria-labelledby="not-found-title">
      <p style="color: var(--action); font-weight: 700">404</p>
      <h1 id="not-found-title" style="margin-block: .5rem 1rem">Page not found</h1>
      <p style="color: var(--muted); margin-bottom: 1.5rem">The page you’re looking for may have moved or no longer exists.</p>
      <a class="btn-primary" routerLink="/home">Back to home</a>
    </section>
  `,
})
class NotFoundPage {}

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: Profile,
    canActivate: [authGuard]
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'products',
    component: ProductsPage,
  },
  {
    path: 'cart',
    component: Cart,
  },
  {
    path: 'products/:id',
    component: ProductDetails,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: '**',
    component: NotFoundPage,
  },
];

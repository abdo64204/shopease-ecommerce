import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProductsPage } from './products-page/products-page';
import { Cart } from './cart/cart';
import { ProductDetails } from './product-details/product-details';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { authGuard } from '../gurdes/auth.guard';
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
];


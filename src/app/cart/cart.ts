import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../service/cart';

@Component({
  imports: [RouterLink, DecimalPipe],
  selector: 'app-cart',
  styleUrl: './cart.scss',
  templateUrl: './cart.html',
})
export class Cart {
  private readonly cartService = inject(CartService);

  readonly cartItems = this.cartService.cartItems;
  readonly subtotal = this.cartService.subtotal;
  readonly cartCount = this.cartService.cartCount;

  // Tax estimate at 8%
  readonly tax = computed(() => this.subtotal() * 0.08);
  readonly total = computed(() => this.subtotal() + this.tax());

  remove(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  increment(productId: number, current: number): void {
    this.cartService.updateQuantity(productId, current + 1);
  }

  decrement(productId: number, current: number): void {
    this.cartService.updateQuantity(productId, current - 1);
  }
}

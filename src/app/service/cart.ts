import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  cartItems = signal<CartItem[]>(this.readCart());

  /** Flat list of products (legacy) — maintained for backward compat */
  cartProducts = computed(() => this.cartItems().map(i => i.product));

  cartCount = computed(() => this.cartItems().reduce((sum, i) => sum + i.quantity, 0));

  subtotal = computed(() =>
    this.cartItems().reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  );

  addToCart(product: Product): void {
    this.cartItems.update(items => {
      const idx = items.findIndex(i => i.product.id === product.id);
      if (idx >= 0) {
        return items.map((item, i) =>
          i === idx ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...items, { product, quantity: 1 }];
    });
    this.persistCart();
  }

  removeFromCart(productId: number): void {
    this.cartItems.update(items => items.filter(i => i.product.id !== productId));
    this.persistCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.cartItems.update(items =>
      items.map(i => i.product.id === productId ? { ...i, quantity } : i)
    );
    this.persistCart();
  }

  clearCart(): void {
    this.cartItems.set([]);
    this.persistCart();
  }

  private readCart(): CartItem[] {
    if (!this.isBrowser) return [];
    try {
      const saved: unknown = JSON.parse(localStorage.getItem('shopease-cart') ?? '[]');
      if (!Array.isArray(saved)) return [];
      return saved.filter((item): item is CartItem =>
        typeof item === 'object' && item !== null &&
        'product' in item && typeof item.product === 'object' && item.product !== null &&
        'id' in item.product && typeof item.product.id === 'number' &&
        'price' in item.product && typeof item.product.price === 'number' &&
        'quantity' in item && typeof item.quantity === 'number' && item.quantity > 0
      );
    } catch {
      return [];
    }
  }

  private persistCart(): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem('shopease-cart', JSON.stringify(this.cartItems()));
    } catch {
      // Keep the in-memory cart usable when browser storage is unavailable.
    }
  }
}

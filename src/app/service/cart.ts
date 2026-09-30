import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  product: any;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  /** Flat list of products (legacy) — maintained for backward compat */
  cartProducts = computed(() => this.cartItems().map(i => i.product));

  cartCount = computed(() => this.cartItems().reduce((sum, i) => sum + i.quantity, 0));

  subtotal = computed(() =>
    this.cartItems().reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  );

  addToCart(product: any): void {
    this.cartItems.update(items => {
      const idx = items.findIndex(i => i.product.id === product.id);
      if (idx >= 0) {
        return items.map((item, i) =>
          i === idx ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...items, { product, quantity: 1 }];
    });
  }

  removeFromCart(productId: number): void {
    this.cartItems.update(items => items.filter(i => i.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.cartItems.update(items =>
      items.map(i => i.product.id === productId ? { ...i, quantity } : i)
    );
  }

  clearCart(): void {
    this.cartItems.set([]);
  }
}

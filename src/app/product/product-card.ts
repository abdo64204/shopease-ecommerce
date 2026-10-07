import { Component, input, output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../service/cart';
import { Product } from '../service/product';

@Component({
  imports: [RouterLink, DecimalPipe],
  selector: 'app-product-card',
  styleUrl: './product-card.scss',
  templateUrl: './product-card.html',
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  readonly loadingMode = input<'eager' | 'lazy'>('lazy');

  readonly addToCartdata = output<Product>();

  private readonly cartService = inject(CartService);

  addToCart(): void {
    this.cartService.addToCart(this.product());
    this.addToCartdata.emit(this.product());
  }

  categoryLabel(category: string): string {
    return category.replaceAll('-', ' ');
  }

  getStars(rating: number): string {
    const full = Math.round(rating);
    return '★'.repeat(full) + '☆'.repeat(5 - full);
  }
}

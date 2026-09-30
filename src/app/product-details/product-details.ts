import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { ProductService } from '../service/product';
import { CartService } from '../service/cart';

@Component({
  imports: [RouterLink, DecimalPipe],
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  readonly product = signal<any>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly selectedImage = signal<string | null>(null);
  readonly addedToCart = signal(false);

  readonly id = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id.set(id);

    if (!id) {
      this.error.set('Product not found.');
      this.loading.set(false);
      return;
    }

    this.productService.getProductById(Number(id)).subscribe({
      next: (data: any) => {
        this.product.set(data);
        const firstImg = data.images?.[0] ?? data.thumbnail ?? null;
        this.selectedImage.set(firstImg);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load product. Please try again.');
        this.loading.set(false);
      }
    });
  }

  selectImage(img: string): void {
    this.selectedImage.set(img);
  }

  addToCart(): void {
    if (this.product()) {
      this.cartService.addToCart(this.product());
      this.addedToCart.set(true);
      setTimeout(() => this.addedToCart.set(false), 2000);
    }
  }

  getStars(rating: number): string {
    const full = Math.round(rating);
    return '★'.repeat(full) + '☆'.repeat(5 - full);
  }
}

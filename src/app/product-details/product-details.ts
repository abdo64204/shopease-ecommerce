import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { ProductService } from '../service/product';
import { CartService } from '../service/cart';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, catchError, switchMap } from 'rxjs';
import { Product } from '../service/product';

@Component({
  imports: [RouterLink, DecimalPipe],
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  readonly product = signal<Product | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly selectedImage = signal<string | null>(null);
  readonly addedToCart = signal(false);

  readonly id = signal<string | null>(null);

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        this.id.set(id);
        this.product.set(null);
        this.selectedImage.set(null);
        this.error.set(null);
        this.loading.set(true);
        if (!id || !/^\d+$/.test(id)) {
          this.error.set('Product not found.');
          this.loading.set(false);
          return EMPTY;
        }
        return this.productService.getProductById(Number(id)).pipe(
          catchError(() => {
            this.error.set('Could not load product. Please try again.');
            this.loading.set(false);
            return EMPTY;
          })
        );
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data: Product) => {
        this.product.set(data);
        const firstImg = data.images?.[0] ?? data.thumbnail ?? null;
        this.selectedImage.set(firstImg);
        this.loading.set(false);
      }
    });
  }

  selectImage(img: string): void {
    this.selectedImage.set(img);
  }

  addToCart(): void {
    const product = this.product();
    if (product) {
      this.cartService.addToCart(product);
      this.addedToCart.set(true);
      setTimeout(() => this.addedToCart.set(false), 2000);
    }
  }

  getStars(rating: number): string {
    const full = Math.round(rating);
    return '★'.repeat(full) + '☆'.repeat(5 - full);
  }
}

import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { ProductCardComponent } from '../product/product-card';
import { Product, ProductService } from '../service/product';

type SortKey = 'recommended' | 'price-asc' | 'price-desc' | 'rating' | 'name';
const STORE_CATEGORIES = new Set(['smartphones', 'laptops', 'tablets', 'mobile-accessories']);

@Component({
  imports: [ProductCardComponent],
  selector: 'app-products-page',
  styleUrl: './products-page.scss',
  templateUrl: './products-page.html',
})
export class ProductsPage implements OnInit {
  private readonly productService = inject(ProductService);

  readonly allProducts = signal<Product[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly searchQuery = signal('');
  readonly activeCategory = signal('all');
  readonly sortBy = signal<SortKey>('recommended');
  readonly visibleLimit = signal(12);
  readonly visibleProducts = computed(() => this.filteredProducts().slice(0, this.visibleLimit()));
  private readonly storeProducts = computed(() =>
    this.allProducts().filter(product => STORE_CATEGORIES.has(product.category))
  );

  readonly categories = computed(() => {
    const cats = [...new Set(this.storeProducts().map(p => p.category))].sort();
    return cats;
  });

  readonly filteredProducts = computed(() => {
    let products = this.storeProducts();
    const query = this.searchQuery().trim().toLowerCase();
    const cat = this.activeCategory();

    if (query) {
      products = products.filter(p =>
        p.title.toLowerCase().includes(query) ||
        (p.brand ?? '').toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    if (cat !== 'all') {
      products = products.filter(p => p.category === cat);
    }

    const sort = this.sortBy();
    if (sort === 'price-asc')  products = [...products].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') products = [...products].sort((a, b) => b.price - a.price);
    if (sort === 'rating')     products = [...products].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    if (sort === 'name')       products = [...products].sort((a, b) => a.title.localeCompare(b.title));

    return products;
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.error.set(null);
    this.loading.set(true);
    this.productService.getProducts().subscribe({
      next: data => {
        this.allProducts.set(data.products ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load products. Please try again.');
        this.loading.set(false);
      }
    });
  }

  onSearch(value: string): void {
    this.searchQuery.set(value);
    this.visibleLimit.set(12);
  }

  onSearchInput(event: Event): void {
    if (event.target instanceof HTMLInputElement) this.onSearch(event.target.value);
  }

  onSortChange(event: Event): void {
    if (event.target instanceof HTMLSelectElement) this.setSort(event.target.value as SortKey);
  }

  setCategory(cat: string): void {
    this.activeCategory.set(cat);
    this.visibleLimit.set(12);
  }

  setSort(sort: SortKey): void {
    this.sortBy.set(sort);
    this.visibleLimit.set(12);
  }

  showMore(): void {
    this.visibleLimit.update(limit => limit + 12);
  }

  categoryLabel(category: string): string {
    return category.replaceAll('-', ' ');
  }

  categoryCount(cat: string): number {
    if (cat === 'all') return this.storeProducts().length;
    return this.storeProducts().filter(p => p.category === cat).length;
  }
}

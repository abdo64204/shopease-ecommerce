import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../product/product-card';
import { ProductService } from '../service/product';

type SortKey = 'recommended' | 'price-asc' | 'price-desc' | 'rating' | 'name';

@Component({
  imports: [ProductCardComponent, FormsModule],
  selector: 'app-products-page',
  styleUrl: './products-page.scss',
  templateUrl: './products-page.html',
})
export class ProductsPage implements OnInit {
  private readonly productService = inject(ProductService);

  readonly allProducts = signal<any[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly searchQuery = signal('');
  readonly activeCategory = signal('all');
  readonly sortBy = signal<SortKey>('recommended');

  readonly categories = computed(() => {
    const cats = [...new Set(this.allProducts().map(p => p.category as string))].sort();
    return cats;
  });

  readonly filteredProducts = computed(() => {
    let products = this.allProducts();
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
    this.productService.getProducts().subscribe({
      next: (data: any) => {
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
  }

  setCategory(cat: string): void {
    this.activeCategory.set(cat);
  }

  setSort(sort: SortKey): void {
    this.sortBy.set(sort);
  }

  categoryCount(cat: string): number {
    if (cat === 'all') return this.allProducts().length;
    return this.allProducts().filter(p => p.category === cat).length;
  }
}

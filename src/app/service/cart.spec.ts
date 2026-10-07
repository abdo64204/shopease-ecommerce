import { TestBed } from '@angular/core/testing';
import { CartService } from './cart';
import { Product } from './product';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    localStorage.removeItem('shopease-cart');
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('adds items, merges quantities, and persists cart changes', () => {
    const product: Product = { id: 1, title: 'Phone', category: 'smartphones', price: 250 };

    service.addToCart(product);
    service.addToCart(product);

    expect(service.cartCount()).toBe(2);
    expect(service.subtotal()).toBe(500);
    expect(JSON.parse(localStorage.getItem('shopease-cart') ?? '[]')[0].quantity).toBe(2);

    service.updateQuantity(product.id, 1);
    expect(service.cartCount()).toBe(1);
    service.removeFromCart(product.id);
    expect(service.cartCount()).toBe(0);
    expect(JSON.parse(localStorage.getItem('shopease-cart') ?? '[]')).toEqual([]);
  });
});

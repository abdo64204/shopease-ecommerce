import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface Product {
  id: number;
  title: string;
  description?: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  thumbnail?: string;
  images?: string[];
  tags?: string[];
  shippingInformation?: string;
  returnPolicy?: string;
  warrantyInformation?: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);

  getProducts() {
    return this.http.get<ProductsResponse>('https://dummyjson.com/products?limit=0');
  }

  getProductById(id: number) {
    return this.http.get<Product>(`https://dummyjson.com/products/${id}`);
  }
}

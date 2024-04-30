import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';

import { ProductComponent } from '@products/components/product/product.component';
import { Product } from '@shared/models/product.model';

import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService, CategoryService, ProductService } from '@shared/services';
import { Category } from '@shared/models/category.model';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLinkWithHref, ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);

  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  // Forma de leer un queryparam
  @Input() category_id?: string;

  ngOnInit() {
    this.getCategories();
  }

  ngOnChanges() {
    this.getProducts();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  private getProducts() {
    this.productService.getProducts(this.category_id).
      subscribe({
        next: (products) => {
          this.products.set(products);
        },
        error: () => {

        },
      });
  }

  private getCategories() {
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories.set(categories);
      },
      error: () => {

      },
    });
  }
}

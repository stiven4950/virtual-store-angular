import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // La forma de hacer las propiedades
  // @Input({ required: true }) cart: Product[] = [];
  hideSideMenu = signal(true);
  private cartService = inject(CartService);
  cart = this.cartService.cart;
  total = this.cartService.total;

  toggleSideMenu() {
    this.hideSideMenu.update(prevState => !prevState);
  }

  /* ngOnChanges(changes: SimpleChanges) {
    const cart = changes["cart"];
    if (cart) {
      this.total.set(this.calculateTotal());
    }
  } */

  /* calculateTotal() {
    return this.cart.reduce((total, product) => total + product.price, 0);
  } */
}

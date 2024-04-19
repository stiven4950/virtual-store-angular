import { Component, Input, SimpleChanges, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input({ required: true }) cart: Product[] = [];

  hideSideMenu = signal(true);
  total = signal(0);

  toggleSideMenu() {
    this.hideSideMenu.update(prevState => !prevState);
  }

  ngOnChanges(changes: SimpleChanges) {
    const itemsCart = changes["cart"];

    if (itemsCart) {
      this.total.set(this.calculateTotal()) ;
    }
  }

  calculateTotal() {
    return this.cart.reduce((total, product) => total + product.price, 0);
  }
}

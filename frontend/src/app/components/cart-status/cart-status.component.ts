import { CartService } from './../../services/cart.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus() {
    
    // Subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    
    // Subscribe to the cart TotalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

  }

}

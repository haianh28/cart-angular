import { Component, OnInit } from '@angular/core';
import { CartItem } from './../../common/cart-item';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {
  cartItem: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetail();
  }
  listCartDetail() {

    // get a handle to the cart items
    // gan gia tri lay ra tư service vao mang da khai bao
    this.cartItem = this.cartService.cartItems;
    // subscribe to the cart totalPrice
    // goi cai ham theo doi tong tien gan bằng bien gia trị vừa khai bao
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    // subscribe to the cart totalQuantity
    // goi cai ham theo doi tong số lương gan bằng bien gia trị vừa khai bao
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
    // compute cart total price and quantity
    this.cartService.computeCartTotals();
  }
  // tăng so luong
  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem)
  }

  // giam so luong
  decrementQuantity(theCartItem : CartItem){
    this.cartService.decrementQuantity(theCartItem);
  }
  //xoa item
  remove(theCartItem : CartItem){
    this.cartService.remove(theCartItem);
  }
  
}

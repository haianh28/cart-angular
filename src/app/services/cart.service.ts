import { Injectable } from '@angular/core';
import { CartItem } from './../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();


  constructor() { }
  // subcribe các gia tri khi co thay doi
  addToCart(theCartItem: CartItem) {
    // check if we already have the item in our cart
    let alreadyExitstsIncart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      //find the item in cart based on item id (tim item cart dựa tren item id)
      // for (let listCartItem of this.cartItems) {
      // neu listCartItem trùng vơi theCartItem.id truyen vao
      // if (listCartItem.id === theCartItem.id) {
      // gan existingCartItem bang voi list 
      // existingCartItem = listCartItem ;
      // break;
      // }
      // }

      //find the item in cart based on item id (tim item cart dựa tren item id)
      existingCartItem = this.cartItems.find(listCartItem => listCartItem.id === theCartItem.id);
      // check if we found it
      alreadyExitstsIncart = (existingCartItem != undefined)
    }
    if (alreadyExitstsIncart) {
      // increment the quantity (tăng số lượng lên)
      existingCartItem.quantity++;
    }
    else {
      // jusst add the item to the array (chỉ cần thêm mục vào mảng)
      // goi mang vao push nhung fied vao mảng
      this.cartItems.push(theCartItem);
    }
    // compute cart total price and total quantity
    this.computeCartTotals();
  }
  // function tinh toan so luon va tong tien
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }
    // publish the new values ... all subcribers will recevi the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('contents of the cart')
    for (let listCartItem of this.cartItems) {
      const subTotalPrice = listCartItem.quantity * listCartItem.unitPrice;
      console.log(`name: ${listCartItem.name}, quantity=${listCartItem.quantity}, unnitPrice=${listCartItem.unitPrice} , subTotalPrice=${subTotalPrice}`);

    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('-----------')
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;
    if(theCartItem.quantity==0){
    this.remove(theCartItem)
    }
  }
  remove(theCartItem: CartItem){
    // get index of item in the array
    const itemIndex = this.cartItems.findIndex(listCartItem => theCartItem.id === theCartItem.id);

    // if found , remove the item from the array at the given index
    if(itemIndex > -1){
      this.cartItems.splice(itemIndex,1);
      this.computeCartTotals()
    }
  }
}

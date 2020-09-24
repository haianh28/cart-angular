import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CartService } from './../../services/cart.service';
import { CartItem } from './../../common/cart-item';
import { Luv2ShopFormService } from './../../services/luv2-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  // su dung form cha
  checkoutFormGroup: FormGroup;
  cartItem: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creaditCardMonths: number[] = [];
  creaditCardYears: number[] = [];
  constructor(private formBuilder: FormBuilder, private cartService: CartService, private luv2ShopFormService: Luv2ShopFormService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']

      })
    });
    this.listCartDetail();
  }
  onSubmit() {
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get("customer").value);
    console.log("The email address is " + this.checkoutFormGroup.get("customer").value.email);
  }
  copyShippingToBilling(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value
      );
    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  // sư kien thay doi thang lay tư 1-12
  handleMonthAndYear() {
    const creaditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentyear: number = new Date().getFullYear();
    const selectedYear: number = Number(creaditCardFormGroup.value.expirationYear);

    // if the current year equals the selected year , then start with the current month
    let startMonth: number;
    if (currentyear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }
this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
  data => {
    this.creaditCardMonths = data;
  }
);
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
    // get moth
    const startMonth: number = new Date().getMonth() + 1;
    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creaditCardMonths = data;
      }
    );
    // get years
    this.luv2ShopFormService.getCreditCardYear().subscribe(
      data => {
        this.creaditCardYears = data
      }
    );
  }
}

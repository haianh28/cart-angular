import { Component, OnInit } from '@angular/core';
import { Product } from './../../common/product';
import { ProductService } from './../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from './../../services/cart.service';
import { CartItem } from './../../common/cart-item';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  // goi class product ra nen phai new ten doi tuong
  product: Product = new Product();
  constructor(private productService: ProductService, private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetailt();
    })
  }
  handleProductDetailt() {
    // get the "id" param string . convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get("id");
    this.productService.getProductDetail(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  addToCard() {
    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
    // todo .. do the real work
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }
}

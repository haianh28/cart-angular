import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { Product } from './../../common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from './../../common/cart-item';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-gird.component.html',
  //  templateUrl: './product-list-table.component.html',
  //  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId : number = 5;
  searchMode: boolean = false;
  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5 ;
  theTotalElements: number = 0;

 private previousKeyword : string;
  constructor(
    private productService: ProductService,
    private cartService : CartService
    , private route: ActivatedRoute) { }// khai bao routetedRoute

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getListProduct();
    })
  }

  // add to card 
  addToCard(theProduct:Product){
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
   // todo .. do the real work
   const theCartItem = new CartItem(theProduct);
   this.cartService.addToCart(theCartItem);
  } 
// han nay de thay doi bao nhieu item hien thi trong 1 page
  getListProduct() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }
  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');
        // if we have a different category
    // then set thePageNumber back to 1
    if(this.previousKeyword != theKeyword){
      // nghia là nhu previousCategoryId khác với CurrentCategory thi page hien thị mặc dinh là 1
      this.thePageNumber=1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`)
      // now search for the products using keyword
    this.productService.getSearchProductListPaginate(this.thePageNumber -1,
      this.thePageSize,
      theKeyword).subscribe(
        this.processsResult()
    );
    // now search for the products using keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )

  }

  handleListProducts() {
    // check if "id" parameter is avaiable
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      // get the "id" param string . convert string to a number using the + symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      // not category id availabe.... default to category id 1
      this.currentCategoryId = 1;
    }
    //
    //check if we have a different category than previous
    // Note : Angular will reuse a component if it is currently being viewed

    // if we have a different category
    // then set thePageNumber back to 1
    if(this.previousCategoryId != this.currentCategoryId){
      // nghia là nhu previousCategoryId khác với CurrentCategory thi page hien thị mặc dinh là 1
      this.thePageNumber=1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`)
    // now get thi products for given category id
    this.productService.getProductListPaginate(this.thePageNumber -1,
      this.thePageSize,
      this.currentCategoryId).subscribe(
        this.processsResult()
    );
  }
  processsResult(){
    return data =>{
      this.products = data._embedded.products;
      this.thePageNumber=data.page.number+1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }
  updatePageSize(pageSize:number){
    // kich thuoc cua trang can hien thi bao nhieu item thi duoc gan bang pageSize khai bao
    this.thePageSize=pageSize;
    this.thePageNumber=1;
    this.getListProduct();
  }
}

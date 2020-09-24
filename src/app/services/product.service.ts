import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Product } from './../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from './../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = "http://localhost:8081/api/products";
  private categoryUrl = "http://localhost:8081/api/product_category";
  // truyen httpClient vao
  constructor(private httpClient: HttpClient) { }
  // tao ra 1 method chung co cung kieu du lieu tra ve
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  // phân trang khi click category
  getProductListPaginate(thePage: number,
    thePageSize: number,
    theCategoryId: number): Observable<GetResponse> {
    // need to build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponse>(searchUrl);
  }
  // phan trang khi search
  getSearchProductListPaginate(thePage: number,
    thePageSize: number,
    thekeyword: string): Observable<GetResponse> {
    // need to build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${thekeyword}` +
     `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponse>(searchUrl);
  }
  // tra ve 1 observable map du lieu dang json tu spring data rest toi mang product
  getProductList(theCategoryId: number): Observable<Product[]> {
    // need to build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  // category
  getProducCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  // search products khi chua phan trang
  searchProducts(name: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${name}`;
    console.log(name);
    return this.getProducts(searchUrl);
  }
  // detail products with value single
  getProductDetail(theProductId: number): Observable<Product> {
    const detailUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(detailUrl);
  }
}

interface GetResponse {
  // day la ten object hien thi du lieu
  _embedded: {
    products: Product[];
  },
  // viet o day vi no hien thi tat ca san pham de phan trang
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}


import { ProductCategory } from './../common/product-category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProduct(theProductId: number): Observable<Product> {
    
    //build URL based on product 
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(thePage: number,
                        thePageSize: number,
                        theCategoryId: number): Observable<GetResponseProducts> {
  
    //build URL based on category id, page and size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                    + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
    
  }

  getProductList(theCategoryId: number): Observable<Product[]> {
  
    //build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
    
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    
    //build URL based on the keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);

  }

  searchProductsPaginate(thePage: number,
                        thePageSize: number,
                        theKeyword: string): Observable<GetResponseProducts> {

    //build URL based on keyword, page and size
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                    + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);

    }
  

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(res => res._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]>  {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(res => res._embedded.productCategory)
    );
  }
  

}

//Unwraps the Json from Spring Data REST _embedded entry
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number, //size of element
    totalElements: number,
    totalPages: number,
    number: number //current page number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
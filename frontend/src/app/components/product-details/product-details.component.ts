import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  product!: Product;

  constructor(private ProductService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {
    // get the 'id' param string. convert string to a number using the "+" symbol"
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
    
    this.ProductService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )  }

}

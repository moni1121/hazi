import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewModel } from 'src/app/core/models/review.model';
import { ProductModel } from 'src/app/core/models/product.model';
import { ProductClientService } from '../../clients/product-client.service';

@Component({
  templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit {

  product: ProductModel;
  reviews: ReviewModel[];

  constructor(
    private route: ActivatedRoute,
    private productClient: ProductClientService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.productClient
      .getProductDetails(id)
      .subscribe(res => {
        this.product = res;
        this.reviews = res.reviews;
      });
  }

  ratingClicked(rating: number): void {
    console.log(rating);
  }
}

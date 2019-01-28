import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewModel } from 'src/app/core/models/review.model';
import { ProductModel } from 'src/app/core/models/product.model';
import { ProductClientService } from '../../clients/product-client.service';
import { MatDialog } from '@angular/material';
import { AddReviewComponent } from './add-review/add-review.component';
import { EditReviewComponent } from './edit-review/edit-review.component';

@Component({
  templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit {

  product: ProductModel;
  reviews: ReviewModel[];
  id: number;
  constructor(
    private route: ActivatedRoute,
    private productClient: ProductClientService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.productClient
      .getProductDetails(this.id)
      .subscribe(res => {
        this.product = res;
        this.reviews = res.reviews;
      });
  }

  addItem(id) {
    debugger
    const dialogRef = this.dialog.open(AddReviewComponent, { data: { id: this.id } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
  
  editItem(id) {
    debugger
    const dialogRef = this.dialog.open(EditReviewComponent, { data: { id: this.id } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }

  ratingClicked(rating: number): void {
    console.log(rating);
  }
}

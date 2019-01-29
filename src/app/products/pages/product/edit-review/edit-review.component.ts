import {Component, Input, OnInit, Inject} from '@angular/core';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { ReviewModel } from 'src/app/core/models/review.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductClientService } from 'src/app/products/clients/product-client.service';

@Component({
  templateUrl: './edit-review.component.html'
})
export class EditReviewComponent implements OnInit {
  editForm: FormGroup;
  review: ReviewModel = new ReviewModel();
  peroductId: number;
  submitted = false;
  stringCut: string;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private productClientService: ProductClientService,
    private formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<EditReviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
    { 
      this.stringCut = route.snapshot['_routerState'].url;
    }
  
// convenience getter for easy access to form fields
  ngOnInit() {
    this.peroductId = parseInt(this.stringCut.substring(this.stringCut.lastIndexOf("/")+1));
    this.productClientService
      .getReviewId(this.data.id, this.peroductId)
      .subscribe(res => {
        this.review = res;
        var v = res;
        console.log(v);
      });

    console.log(this.review);
    this.editForm = this.formBuilder.group({
      'id': [this.review.id],
      'text': [this.review.text, [Validators.required, Validators.minLength(3)]]
    });
  }

  ratingClicked(rating: number): void {
    console.log(rating);
  }

  editreview() {
      const editReview: ReviewModel = this.editForm.value;
      this.productClientService.update(editReview).subscribe(_ => this.dialogRef.close(true));
  }
}

import {Component, Input, OnInit, Inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
 
  submitted = false;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private productClientService: ProductClientService,
    private formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<EditReviewComponent>)
    { }
  
// convenience getter for easy access to form fields
  ngOnInit() {
    debugger
    this.id = +this.route.snapshot.paramMap.get('id');
    debugger
    this.productClientService
      .getReviewId(this.id)
      .subscribe(res => {
        this.review = res;
      });
    
    this.editForm = this.formBuilder.group({
      text: [this.review.text, [Validators.required, Validators.minLength(3)]]
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

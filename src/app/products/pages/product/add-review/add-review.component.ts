import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductClientService } from 'src/app/products/clients/product-client.service';
import { ReviewModel } from 'src/app/core/models/review.model';
import { ProductModel } from 'src/app/core/models/product.model';

@Component({templateUrl: 'add-review.component.html'})
export class AddReviewComponent implements OnInit {
    addForm: FormGroup;
    loading = false;
    submitted = false;
    review: ReviewModel = new ReviewModel();
    stringCut: string;
    id: number;
    reviewId: number;
    product: ProductModel;
    
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private readonly dialogRef: MatDialogRef<AddReviewComponent>,
        private productService: ProductClientService,
        private route: ActivatedRoute,
        @Inject(MAT_DIALOG_DATA) public data: any)
        {
          this.stringCut = route.snapshot['_routerState'].url;
        } 

    ngOnInit() {
    debugger
    this.productService
      .getProductDetails(this.data.id)
      .subscribe(res => {
        this.product = res;
      });
        this.addForm = this.createFormGroup(); 
        this.review.stars = 0;
    }

    createFormGroup(){
        return this.formBuilder.group({
            'text': ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    addReview() {
            const newReview: ReviewModel = this.addForm.value;
            this.productService.insertReview(this.data.id, newReview).subscribe(_ => this.dialogRef.close(true));
    }
}

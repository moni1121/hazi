import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ProductClientService } from 'src/app/products/clients/product-client.service';
import { ReviewModel } from 'src/app/core/models/review.model';

@Component({templateUrl: 'add-review.component.html'})
export class AddReviewComponent implements OnInit {
    addForm: FormGroup;
    loading = false;
    submitted = false;
    review: ReviewModel = new ReviewModel();

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private readonly dialogRef: MatDialogRef<AddReviewComponent>,
        private productService: ProductClientService,
        private route: ActivatedRoute,
        ) { }

    ngOnInit() {
        this.addForm = this.createFormGroup(); 
        this.review.stars = 0;
        const id = +this.route.snapshot.paramMap.get('id');
        console.log(id);
    }

    createFormGroup(){
        return this.formBuilder.group({
            id: [this.review.id],
            stars: [this.review.stars, [Validators.required, Validators.minLength(3)]],
            text: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    addReview() {
            const newReview: ReviewModel = this.addForm.value;
            this.productService.insertReview(newReview).subscribe(_ => this.dialogRef.close(true));
    }
}

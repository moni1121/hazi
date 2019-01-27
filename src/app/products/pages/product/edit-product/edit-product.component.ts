import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewModel } from 'src/app/core/models/review.model';
import { ProductModel } from 'src/app/core/models/product.model';
import { ProductClientService } from 'src/app/products/clients/product-client.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './edit-product.component.html'
})
export class EditProductComponent implements OnInit {
  editForm: FormGroup;
  product: ProductModel = new ProductModel();
  reviews: ReviewModel[];
  loading = false;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private productClient: ProductClientService,
    private formBuilder: FormBuilder
  ) { }

// convenience getter for easy access to form fields
get f() { return this.editForm.controls; }

  ngOnInit() {
      this.editForm = this.formBuilder.group({
    id: [this.product.id, [Validators.required, Validators.minLength(3)]],
    name: [this.product.name, [Validators.required, Validators.minLength(3)]],
    review: [this.product.reviews, [Validators.required, Validators.minLength(3)]]

    });
    
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

//   onSubmit() {
//     this.submitted = true;

//     // stop here if form is invalid
//     if (this.editForm.invalid) {
//         return;
//     }

//     this.loading = true;
//     this.userService.register(this.editForm.value)
//         .pipe(first())
//         .subscribe(
//             data => {
//                 this.router.navigate(['/login']);
//             },
//             error => {
//                 this.loading = false;
//             });
// }
}

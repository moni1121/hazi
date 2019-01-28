import {Component, Input, OnInit, Inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewModel } from 'src/app/core/models/review.model';
import { ProductModel } from 'src/app/core/models/product.model';
import { ProductClientService } from 'src/app/products/clients/product-client.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './edit-product.component.html'
})
export class EditProductComponent implements OnInit {
  editForm: FormGroup;
  product: ProductModel = new ProductModel();
  reviews: ReviewModel[];
  loaded = false;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductClientService,
    private formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data:
    {
    id: number
    }) { }
  
// convenience getter for easy access to form fields
  ngOnInit() {
    
    this.productService
      .getProductDetails(this.data.id)
      .subscribe(res => {
        this.product = res;
        this.reviews = res.reviews;
      });
    
    this.editForm = this.formBuilder.group({
    id: [this.product.id, [Validators.required, Validators.minLength(3)]],
    name: [this.product.name, [Validators.required, Validators.minLength(3)]],
    review: [this.product.reviews, [Validators.required, Validators.minLength(3)]]
    });
      this.loaded = true;
  }

  ratingClicked(rating: number): void {
    console.log(rating);
  }

  editProduct() {
      const editProduct: ProductModel = this.editForm.value;
      this.productService.insert(editProduct).subscribe(_ => this.dialogRef.close(true));
  }
}

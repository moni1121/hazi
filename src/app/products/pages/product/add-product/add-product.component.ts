import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductModel } from 'src/app/core/models/product.model';


@Component({templateUrl: 'add-product.component.html'})
export class AddProductComponent implements OnInit {
    addForm: FormGroup;
    loading = false;
    submitted = false;
    product: ProductModel = new ProductModel();

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private productService: ProductService) { }

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            name: [this.product.name, [Validators.required, Validators.minLength(3)]],
            reviews: [this.product.reviews, [Validators.required, Validators.minLength(3)]]
        });
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.addForm.invalid) {
            return;
        }

        this.loading = true;
        this.productService.addNew(this.addForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/home']);
                },
                error => {
                    this.loading = false;
                });
    }
}

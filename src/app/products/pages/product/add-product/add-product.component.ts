import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductModel } from 'src/app/core/models/product.model';
import { MatDialogRef } from '@angular/material';
import { ProductClientService } from 'src/app/products/clients/product-client.service';

@Component({templateUrl: 'add-product.component.html'})
export class AddProductComponent implements OnInit {
    addForm: FormGroup;
    loading = false;
    submitted = false;
    product: ProductModel = new ProductModel();

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private readonly dialogRef: MatDialogRef<AddProductComponent>,
        private productService: ProductClientService,
        ) { }

    ngOnInit() {
        this.addForm = this.createFormGroup(); 
    }

    createFormGroup(){
        return this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    addProduct() {
            const newProduct: ProductModel = this.addForm.value;
            this.productService.insert(newProduct).subscribe(_ => this.dialogRef.close(true));
          }
}

import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './pages/product/product-details.component';
import { SharedModule } from '../shared/shared.module';
import { ProductListComponent } from './pages/product/product-list.component';
import { ProductClientService } from './clients/product-client.service';
import { ProductRoutingModule } from './product-routing.module';
import { FakeBackendInterceptor } from '../core/helpers/fake-backend';
import { AddProductComponent } from './pages/product/add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditReviewComponent } from './pages/product/edit-review/edit-review.component';
import { AddReviewComponent } from './pages/product/add-review/add-review.component';

@NgModule({
  declarations: [
    ProductDetailsComponent,
    ProductListComponent,
    AddProductComponent,
    EditReviewComponent,
    AddReviewComponent
  ],
  imports: [
    SharedModule,
    ProductRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductClientService,
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true }
  ]
})
export class ProductModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Auth } from '../core/auth/auth';
import { ProductListComponent } from './pages/product/product-list.component';
import { ProductDetailsComponent } from './pages/product/product-details.component';
import { AddProductComponent } from './pages/product/add-product/add-product.component';
import { EditProductComponent } from './pages/product/edit-product/edit-product.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: ':id', component: ProductDetailsComponent, canActivate: [Auth] },
  { path: 'new', component: AddProductComponent },
  { path: 'edit', component: EditProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

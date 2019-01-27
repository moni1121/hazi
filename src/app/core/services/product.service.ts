import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/product.model';


@Injectable()
export class ProductService {

product: ProductModel;
constructor(private http: HttpClient) { }

    addNew(product: ProductModel): Observable<ProductModel>
    {
        return this.http.post<any>(`/products/new`, { product })
    }
        
}
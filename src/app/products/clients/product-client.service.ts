import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProductListModel } from 'src/app/core/models/product-list.model';
import { ProductModel } from 'src/app/core/models/product.model';
import { listMock } from './mock/mock-client.service';
import { ReviewModel } from 'src/app/core/models/review.model';

@Injectable()
export class ProductClientService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts(filter: string): Observable<ProductListModel[]> {
    const obs = filter
      ? of(listMock.filter(x => x.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1))
      : of(listMock);
    return obs.pipe(delay(500));
  }

  insert(product: ProductModel){
    return this.http.post<ProductModel>(`/products/new`, { product })
  } 
    
  insertReview(review: ReviewModel){
    return this.http.post<ReviewModel>(`/products/details/new`, { review })
  }

  update(product: ReviewModel) {
    return this.http.put<ReviewModel>(`/products/details/edit/${product.id}`, product);
  }
  
  getProductDetails(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`/product/${id}`);
  }

  getReviewId(id: number, id2: number): Observable<ReviewModel> {
    return this.http.get<ReviewModel>(`/products/${id2}/edit/${id}`);
  }
}

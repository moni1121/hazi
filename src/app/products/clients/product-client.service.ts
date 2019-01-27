import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProductListModel } from 'src/app/core/models/product-list.model';
import { ProductModel } from 'src/app/core/models/product.model';
import { listMock } from './mock/mock-client.service';

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

  getProductDetails(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`/product/${id}`);
  }
}

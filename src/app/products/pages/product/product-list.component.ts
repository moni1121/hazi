import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, distinctUntilChanged, filter, switchMap, map, catchError, tap } from 'rxjs/operators';
import { ProductListModel } from 'src/app/core/models/product-list.model';
import { ProductClientService } from '../../clients/product-client.service';
import {MatTableDataSource, MatDialog} from '@angular/material';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ["name", "stars", "buttons"];
  destroy$ = new Subject();
  debouncer$ = new Subject<string>();

  error: string | null = null;
  isLoading = true;
  filter: string;
  products: ProductListModel[];
  dataSource;

  constructor(
    private productService: ProductClientService,
    private readonly dialog: MatDialog) { }

  ngOnInit() {
    this.loadProducts();
    this.debouncer$
      .pipe(
        filter((x: string) => (x && x.length > 2) || !x),
        // tslint:disable-next-line:triple-equals
        debounceTime(500),
        distinctUntilChanged((x, y) => x == y),
        takeUntil(this.destroy$))
      .subscribe(() => this.loadProducts());

  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  addItem() {
    const dialogRef = this.dialog.open(AddProductComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }

  loadProducts() {
    this.isLoading = true;
    this.productService.getProducts(this.filter).subscribe(
      res => {
        this.products = res;
        this.products.forEach(value => {
          let szamok : number = 0;
          let darab : number = 0;
          value.reviews.forEach(review => {
            szamok += review.stars;
          });
          darab = value.reviews.length;
          value.avgRating = Math.floor(szamok / darab);

        });
        this.dataSource = new MatTableDataSource(this.products);
      }, error => {
        this.error = error;
      }, () => {
        this.isLoading = false;
      });

  }
  
}

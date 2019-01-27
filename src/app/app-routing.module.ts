import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CoreModule } from './core/core.module';
import { LayoutComponent } from './core/components/layout/layout.component';
import { ProductModule } from './products/product.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => CoreModule
  },
  {
    path: 'products',
    component: LayoutComponent,
    loadChildren: () => ProductModule,
    // loadChildren: './books/books.module#BooksModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
      // , {
      //   preloadingStrategy: PreloadAllModules,
      // }
      )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

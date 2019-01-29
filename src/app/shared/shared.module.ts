import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {StarRatingComponent} from "./component/rating/star-rating.component";
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { MenuMouseDirective } from './directives/menu-mouse.component';

@NgModule({
  declarations: [
    StarRatingComponent,
    MenuMouseDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatToolbarModule,
    NgbModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatToolbarModule,
    StarRatingComponent,
    MatIconModule,
    MatDialogModule,
    MenuMouseDirective
  ]
})
export class SharedModule { }

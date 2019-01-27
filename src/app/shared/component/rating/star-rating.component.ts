import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngbd-rating-basic',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent  {
  @Input() rating = 0;

}

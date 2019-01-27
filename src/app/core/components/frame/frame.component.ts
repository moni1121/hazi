import { Component, ViewChild, ElementRef, ViewChildren, QueryList, ContentChild } from '@angular/core';
import { StarRatingComponent } from 'src/app/shared/component/rating/star-rating.component';

@Component({
    selector: 'app-frame',
    templateUrl: 'frame.component.html'
})
export class FrameComponent {

    @ViewChild('container') container: ElementRef;

    clicked() {
        console.log('log container');
        console.log(this.container);

    }

}

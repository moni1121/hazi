import { ReviewModel } from './review.model';

export class ProductListModel{
    id: number;
    name: string;
    reviews: ReviewModel[];   
    avgRating?: number;
}
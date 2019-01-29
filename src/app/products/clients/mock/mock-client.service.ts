import { ProductModel } from 'src/app/core/models/product.model';
import { ProductListModel } from 'src/app/core/models/product-list.model';

export const listMock: ProductModel[] = [
    { id: 1, name: 'valami',   reviews: [{id: 1, stars: 5, text: 'tökéletes'}, {id: 2, stars: 4, text: 'nem rossz'}] },
    { id: 2, name: 'valami1',  reviews: [{id: 1, stars: 1, text: 'nem jó'}]},
    { id: 3, name: 'valami2',  reviews: [{id: 1, stars: 3, text: 'megfelelt'}]},
    { id: 4, name: 'valami3',  reviews: [{id: 1, stars: 3, text: 'megfelelt'}]},
    { id: 5, name: 'valami4',  reviews: [{id: 1, stars: 3, text: 'elmey'}]},
];
export const detailsMocks: ProductModel[] =
    listMock.map((x: ProductListModel): ProductModel => {return x});

export function getReviewId(reviewId: number, productId: number){
    var product = detailsMocks.find(x => x.id === productId);

}
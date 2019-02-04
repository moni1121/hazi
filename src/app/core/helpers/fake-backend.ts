import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { detailsMocks, listMock } from 'src/app/products/clients/mock/mock-client.service';
import { ReviewModel } from '../models/review.model';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            // authenticate
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                let filteredUsers = users.filter(user => {
                    return user.username === request.body.username && user.password === request.body.password;
                });

                if (filteredUsers.length) {
                    let user = filteredUsers[0];
                    let body = {
                        username: user.username,
                        password: user.password,
                        token: 'fake-jwt-token'
                        
                    };

                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

            // get users
            if (request.url.endsWith('/users') && request.method === 'GET') {
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: users }));
                } else {
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // get user by id
            if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    return of(new HttpResponse({ status: 200, body: user }));
                } else {
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // register user
            if (request.url.endsWith('/users/register') && request.method === 'POST') {
                let newUser = request.body;

                let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'Username "' + newUser.username + '" is already taken' } });
                }
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // product details
            if (request.url.match(/\/product\/\d+$/) && request.method === 'GET') {
                const urlParts = request.url.split('/');
                const id = parseInt(urlParts[urlParts.length - 1], 10);
                const product = detailsMocks.find(x => x.id === id);
                if (product) {
                    return of(new HttpResponse({
                        status: 200,
                        body: product
                    }));
                } else {
                    return throwError({ error: { message: 'Not found' } });
                }
            }

            // edit product
            if (request.url.match(/\/products\/\d+\/edit\/\d+$/) && request.method === 'GET') {
                const urlParts = request.url.split('/');
                const reviewId = parseInt(urlParts[urlParts.length - 1]);
                const productId = parseInt(urlParts[urlParts.length - 3]);
                var review;
                if (detailsMocks.length != 0){
                    detailsMocks.forEach(list => {
                    if(list.id === productId){
                    list.reviews.forEach(x => {
                        if(x.id === reviewId){
                            review = x;
                        }
                    })
                }
                })
                if (review){
                    return of(new HttpResponse({
                        status: 200,
                        body: review
                    }));
                }
                else {
                    return throwError({ error: { message: 'Not gergerge' } });
                }
            }
            }

            // add review
            if (request.url.match(/\/products\/\d+\/add$/) && request.method === 'POST') {
                let newReview = request.body;
                const urlParts = request.url.split('/');
                const productId = parseInt(urlParts[urlParts.length - 2], 10);
                var newReviewId; 
                detailsMocks.forEach(list => {
                    if(list.id === productId){
                        newReviewId = list.reviews.length + 1
                    }
                });
                newReview.id = newReviewId;
                detailsMocks.forEach(list => {
                    if(list.id === productId){
                    list.reviews.push(newReview);
                return of(new HttpResponse({ status: 200, body: newReview }));
                }
                return next.handle(request);
            })
            }

            // register user
            if (request.url.endsWith('/products/new') && request.method === 'POST') {
                let newProduct = request.body;
                newProduct.id = detailsMocks.length + 1;
                detailsMocks.push(newProduct);
                return of(new HttpResponse({ status: 200, body: newProduct }));
            }
            return next.handle(request);
            
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
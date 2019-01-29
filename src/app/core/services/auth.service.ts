import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthService {
    private isAuthenticated: BehaviorSubject<boolean>;
    private currentUser: BehaviorSubject<UserModel>;

    constructor(
        private http: HttpClient,
    ) {
        const currentUser = localStorage.getItem('currentUser');
        const isAuthenticated = !!currentUser;
        this.isAuthenticated = new BehaviorSubject<boolean>(isAuthenticated);
        this.currentUser = new BehaviorSubject<UserModel>(isAuthenticated ? { username: currentUser['name'], password: currentUser['password']} : null);
    }

    get IsAuthenticated$(): Observable<boolean> {
        return this.isAuthenticated.asObservable();
    }

    get CurrentUser$(): Observable<UserModel> {
        return this.currentUser.asObservable();
    }

    login(username: string, password: string): Observable<boolean> {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const current = users.find(u => u.username === username);
        return this.http.post<any>(`/users/authenticate`, { username: current.username, password: current.password })
            .pipe(map(user => {
                if (user){
                    this.isAuthenticated.next(true);
                    this.currentUser.next({ username, password});
                    localStorage.setItem('currentUser', JSON.stringify(user));
                return true;
                }
            }))
    }

    logout() {
        this.isAuthenticated.next(false);
        this.currentUser.next(null);
        localStorage.removeItem('currentUser');
    }
}

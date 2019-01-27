import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';


@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<UserModel[]>(`/users`);
    }

    getByUserName(username: string) {
        return this.http.get(`/users/` + username);
    }

    register(user: UserModel) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        return this.http.post(`/users/register`, user);
    }

    update(user: UserModel) {
        return this.http.put(`/users/` + user.username, user);
    }

    delete(username: string) {
        return this.http.delete(`/users/` + username);
    }
}
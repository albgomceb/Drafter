import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
    headers: new Headers({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class ProfileService {
    constructor(
        private http: HttpClient, private router: Router) {
    }

    private staticUrl = environment.baseApi;

    getUser(): Observable<User> {
        return this.http.get<User>(this.staticUrl+"/users/me");
    }

    public updateUser(user:User):Observable<any> {
        return this.http.post<User>(this.staticUrl+"/users/me/edit", user, {});
    }

    
}

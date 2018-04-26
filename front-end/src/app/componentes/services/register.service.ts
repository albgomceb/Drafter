import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { User } from '../models/user.model';

const httpOptions = {
    headers: new Headers({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class RegisterService {
    constructor(
        private http: HttpClient) {
    }

    private staticUrl = environment.baseApi;

    public saveUser(user:User):Observable<any> {
        return this.http.post<User>(this.staticUrl+"/users/", user, {});
    }
}


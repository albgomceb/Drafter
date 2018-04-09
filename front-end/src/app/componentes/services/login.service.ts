import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { User } from '../models/user.model';
import { Login } from '../models/login.model';

const httpOptions = {
    headers: new Headers({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class LoginService {
    constructor(
        private http: HttpClient) {
    }

    private staticUrl = environment.baseApi;

    public login(login:Login):Observable<any> {
        return this.http.post<Login>(this.staticUrl+"/users/login", login, {});
    }
}

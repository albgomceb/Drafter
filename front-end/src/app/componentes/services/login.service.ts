import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { Router } from '@angular/router';

import * as $ from 'jquery';


const httpOptions = {
    headers: new Headers({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class LoginService {
    constructor(
        private http: HttpClient, private router: Router) {
    }

    private staticUrl = environment.baseApi;


    private user: User;


    public login(login:Login):Observable<any> {
        return this.http.post<Login>(this.staticUrl+"/users/login", login, {});
    }

    public logout() {
        this.http.get(this.staticUrl+"/users/logout", {}).subscribe(res => {
            this.user = undefined;
            this.router.navigate(['home']);
        });
    }


    public init(callback: Function) {
        if(this.user) {
            callback();
            return;
        }

        this.http.get<User>(this.staticUrl+"/users/me", {}).subscribe(res => {
            this.user = res;
            callback();
        }, error => callback());
    }

    public syncInit() {
        if(this.user) {
            return;
        }

        $.ajax({
            async: false,
            type: 'GET',
            url: this.staticUrl+"/users/me",
            success: (data) => {
                this.user = data;
            },
            error: () => {}
        });
    }


    public getPrincipal(): User {
        return this.user;
    }

    public isAuthenticated(): boolean {
        return this.user != undefined || this.user != null;
    }

    public isAnonymous(): boolean {
        return this.user == undefined || this.user == null;
    }

    public hasAuthority(authority: string): boolean {
        for(var auth of this.user.authorities) {
            if(auth == authority)
                return true;
        }

        return false;
    }
}

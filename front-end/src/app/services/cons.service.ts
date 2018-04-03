import { Cons } from './../models/cons';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConsService {

  constructor(private http:HttpClient) {}

  staticUrl:String = environment.baseApi + '/data/cons';

  saveCons(cons: Cons, meeting: number): Observable<Cons> {
    return this.http.post<Cons>(this.staticUrl+'/save/'+meeting, cons, {});
  }
}

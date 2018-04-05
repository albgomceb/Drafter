import { Pros } from './../models/pros';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProsService {

  constructor(private http:HttpClient) {}

  staticUrl:String = environment.baseApi + '/data/pros';

  savePros(pros: Pros, meeting: number): Observable<Pros> {
    return this.http.post<Pros>(this.staticUrl+'/save/'+meeting, pros, {});
  }
}

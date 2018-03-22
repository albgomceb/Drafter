import { Conclusion } from './../models/conclusion';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConclusionService {

  constructor(private http:HttpClient) {}

  staticUrl:String = environment.baseApi + '/data/conclusion';

  saveConclusion(conclusion: Conclusion, meeting: number): Observable<Conclusion> {
    return this.http.post<Conclusion>(this.staticUrl+'/save/'+meeting, conclusion, {});
  }
}

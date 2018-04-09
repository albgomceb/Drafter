import { Vote } from './../models/vote.model';
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class VoteService {

  constructor(private http:HttpClient) {}

  staticUrl:String = environment.baseApi;

  saveVote(votes:Vote[]): Observable<Vote> {
    return this.http.post<Vote>(this.staticUrl+'/votes/',votes,{});
  }
}

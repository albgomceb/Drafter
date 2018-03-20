import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Participant } from '../models/participant.model';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ParticipantService {

  constructor(private http:HttpClient) {}

  staticUrl:String = environment.baseApi;


  getParticipants(): Observable<Array<Participant>> {
    return this.http.get<Array<Participant>>(this.staticUrl+'/participants');
  }

}

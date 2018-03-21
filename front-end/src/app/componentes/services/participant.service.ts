import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Participant } from '../models/participant.model';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Meeting } from '../models/meeting.model';


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

  saveMeeting(meeting: Meeting): Observable<Meeting>{
    return this.http.post<Meeting>(this.staticUrl+'/meeting/', meeting, {});
  }

}

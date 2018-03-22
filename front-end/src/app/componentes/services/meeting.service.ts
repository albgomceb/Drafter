import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Meeting2 } from '../models/meeting.model2';
import { Agenda2 } from '../models/agenda.model2';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MeetingService {
  
  constructor(private http:HttpClient) {}

  staticUrl:String = environment.baseApi;

  getMeeting(meetingId:number): Observable<Meeting2> {
    return this.http.get<Meeting2>(this.staticUrl+'/minutes/meeting/'+meetingId);
  }

  getAgendas(meetingId:number): Observable<Array<Agenda2>> {
    return this.http.get<Array<Agenda2>>(this.staticUrl+'/minutes/meeting/'+ meetingId + '/agenda');
  }

  getConclusions(meetingId:number): Observable<Array<Meeting2>> {
    return this.http.get<Array<Meeting2>>(this.staticUrl+'/minutes/meeting/' + meetingId + '/conclussions');
  }

}

import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Meeting } from '../models/meeting.model';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MeetingService {
  
  constructor(private http:HttpClient) {}

  staticUrl:String = environment.baseApi;

  getMeeting(meetingId:number): Observable<Meeting> {
    return this.http.get<Meeting>(this.staticUrl+'/minutes/meeting/'+meetingId);
  }

  getAgendas(meetingId:number): Observable<Array<Meeting>> {
    return this.http.get<Array<Meeting>>(this.staticUrl+'/minutes/agenda/'+meetingId);
  }

  getConclusions(agendaId:number): Observable<Array<Meeting>> {
    return this.http.get<Array<Meeting>>(this.staticUrl+'/minutes/conclusion/'+agendaId);
  }

}

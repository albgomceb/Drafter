import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Meeting } from '../models/meeting.model';
import { Agenda2 } from '../models/agenda.model2';
import { Conclusion } from '../../models/conclusion';
import { MeetingPagination } from '../models/meetingPagination.model';
import { Participant } from '../models/participant.model';
import { Option } from '../models/option.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MeetingService {
  
  constructor(private http:HttpClient) {}

  staticUrl:String = environment.baseApi;

  public getMeeting(meetingId:number): Observable<Meeting> {
    return this.http.get<Meeting>(this.staticUrl+'/minutes/meeting/'+meetingId);
  }

  public getAgendas(meetingId:number): Observable<Array<Agenda2>> {
    return this.http.get<Array<Agenda2>>(this.staticUrl+'/minutes/meeting/'+ meetingId + '/agenda');
  }

  public getConclusions(agendaId:number): Observable<Array<Conclusion>> {
    return this.http.get<Array<Conclusion>>(this.staticUrl+'/agendas/' + agendaId + '/conclussion');
  }

  public getMeetingsByUser(userId: number, p: number): Observable<MeetingPagination> {
    return this.http.get<MeetingPagination>(this.staticUrl+'/meeting/list/' + userId + '/page/' + p);
  }

  public isParticipant(meetingId: number): Observable<boolean> {
    return this.http.get<boolean>(this.staticUrl+'/meeting/isParticipant/' + meetingId);
  }

  public getLeader(meetingId: number): Observable<Option> {
    return this.http.get<Option>(this.staticUrl+'/meeting/getLeader/' + meetingId);
  }
}

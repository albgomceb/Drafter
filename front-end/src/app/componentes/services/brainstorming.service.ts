import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Meeting2 } from '../models/meeting.model2';
import { Idea2 } from '../models/idea2.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BrainstormingService {
  
  constructor(private http:HttpClient) {}

  staticUrl:String = environment.baseApi;

  getMeeting(meetingId:number): Observable<Meeting2> {
    return this.http.get<Meeting2>(this.staticUrl+'/minutes/brainstorming/'+meetingId);
  }

  getIdeas(meetingId:number): Observable<Array<Idea2>> {
    return this.http.get<Array<Idea2>>(this.staticUrl+'/minutes/brainstorming/'+ meetingId + '/ideas');
  }


}

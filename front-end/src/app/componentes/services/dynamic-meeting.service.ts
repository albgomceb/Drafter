import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Meeting } from '../models/meeting.model';
import { Agenda2 } from '../models/agenda.model2';
import { Conclusion } from '../../models/conclusion';
import { User } from '../models/user.model';
import { Option } from '../models/option.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DynamicMeetingService {
  
  constructor(private http:HttpClient) {}
  
  staticUrl:String = environment.baseApi;
  
  
  getMeetingInfo(meetingId: number): Observable<any> {
    return this.http.get(this.staticUrl + '/meeting/'+meetingId);
  }

  finish(meetingId: number): Observable<any> {
    return this.http.get(this.staticUrl+'/meeting/finish/'+meetingId);
  }

  addUserToMeeting(meetingId:number,user:User){
    let meeting = this.getMeetingInfo(meetingId).subscribe((res:any) => {

      res.users.push(user);
    });
  }

  getMeetingTypes():Observable<Array<Option>>{
    //un endoint que devuelva la lista de tipos de reuniones existentes en una lista de Option.java con id =
    // un string que identifique a la reunión y name = nombre más descriptivo
    return this.http.get<Array<Option>>(this.staticUrl+'/meeting/types/');
    
  }

  nextStep(meetingId: number): Observable<string>{
    return this.http.get<string>(this.staticUrl+'/meeting/nextStep/'+meetingId);
  }

  setTimer(meetingId: number, timer: number): Observable<any> {
    return this.http.get(this.staticUrl+'/meeting/setTimer/'+meetingId+'/'+timer);
  }
}

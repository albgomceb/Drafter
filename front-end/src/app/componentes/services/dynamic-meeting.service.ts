import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Meeting2 } from '../models/meeting.model2';
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
  
  
  getMeetingInfo(meetingId: number){
    //llamar a un endpoint que obtenga los datos de una reunión, los datos deben mantener el formato falseado
   return this.http.get(this.staticUrl + '/meeting/standard/'+meetingId);
    // if(meetingId < this.reunionesFalsas.length)
    //  { return this.reunionesFalsas[meetingId];}
    // else 
    //   {return null; }
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

 
  public reunionesFalsas:Array<any>=[
    {
      id:0,
      tipo: 'standard',
      ultimoPaso: 1,
      isFinished: false,
      users:[]
    },
    {
      id:2,
      tipo: 'six-hats',
      ultimoPaso: 0,
      isFinished: false,
      users:[]
    },
    {
      id:0,
      tipo: 'standard',
      ultimoPaso: 1,
      isFinished: false,
      users:[]
    }

  ];
}

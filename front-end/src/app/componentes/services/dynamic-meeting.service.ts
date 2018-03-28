import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Meeting2 } from '../models/meeting.model2';
import { Agenda2 } from '../models/agenda.model2';
import { Conclusion } from '../../models/conclusion';
import { User } from '../models/user.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DynamicMeetingService {
  
  constructor(private http:HttpClient) {}
  
  staticUrl:String = environment.baseApi;
  
  
  getMeetingInfo(meetingId: number){
    //llamar a un endpoint que obtenga los datos de una reunión, los datos deben mantener el formato falseado
   
    if(meetingId < this.reunionesFalsas.length)
     { return this.reunionesFalsas[meetingId];}
    else 
      {return null; }
  }

  finish(meetingId: number) {
    //llamar a un endpoint que marque la reunión como terminada
    console.log('meetingFinished');
  }

  addUserToMeeting(meetingId:number,user:User){
    let meeting = this.getMeetingInfo(meetingId);
    meeting.users.push(user);
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
      tipo: '6hats',
      ultimoPaso: 0,
      isFinished: true,
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

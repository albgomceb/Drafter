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

  finish(meetingId: number) {
    //llamar a un endpoint que marque la reunión como terminada
    console.log('meetingFinished');
  }

  addUserToMeeting(meetingId:number,user:User){
    let meeting = this.getMeetingInfo(meetingId).subscribe((res:any) => {

      res.users.push(user);
    });
  }
  getMeetingTypes():Array<Option>{
    //un endoint que devuelva la lista de tipos de reuniones existentes en una lista de Option.java con id =
    // un string que identifique a la reunión y name = nombre más descriptivo
    let op1:Option = new Option();
    op1.id = 'standard';
    op1.name = 'Standard meeting';

    let op2:Option = new Option();
    op2.id = 'six-hats';
    op2.name = '6-hats meeting';
    
    let op3:Option = new Option();
    op3.id = 'brainstorming';
    op3.name = 'Brainstorming meeting';

    return [ 
     op1,
      op2,
      op3
    ]
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

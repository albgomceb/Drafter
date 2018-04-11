import { Meeting } from './meeting.model';
import { User } from './user.model';
import { Departament } from './department.model';

export class Participant {
  id: number;
  role:String;
  hasAttedend:Boolean;
  departamentId:number;
  userId:number;
  meetingId:number;
}

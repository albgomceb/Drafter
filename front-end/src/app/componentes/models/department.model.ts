import { Organization } from './organization.model';
import { Meeting } from './meeting.model';
import { User } from './user.model';

export class Departament {
  id: number;
  name:String;
  organizationId:number;
  users:Array<User>;
}
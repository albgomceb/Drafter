import { Organization } from './organization.model';
import { Meeting } from './meeting.model';
import { User } from './user.model';

export class Department {
  id: number;
  name:String;
  isInput: Boolean;
  organizationId:number;
  users:Array<User>;
}
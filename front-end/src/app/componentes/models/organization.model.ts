import { Department } from './department.model';
import { User } from './user.model';

export class Organization {
  id: number;
  enterprise:String;
  description:String;
  address:String;
  phone:String;
  email:String;
  logo:String;
  userId:number;
  departments:Array<Department>;
}

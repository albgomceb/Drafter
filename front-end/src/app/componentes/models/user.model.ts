import { Option } from "./option.model";

export class User {
    id: string;
    name:string
    surname:string 
    email:string 
    phone:string
    photo:string
    departments: Array<Option>;
    
  }
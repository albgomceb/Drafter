import { Option } from "./option.model";

export class User {
  static model: any;
    name: string;
    surname: string;
    email: string;
    username: string;
    password: string;
    // phone: string;
    // picture: string;
    // departments: Array<Option>;

    setName(name:string) {
      this.name = name; 
    }
    setSurname(surname:string) {
      this.surname = surname; 
    }
    setEmail(email:string) {
      this.email = email; 
    }
    setUsername(username:string) {
      this.username = username; 
    }
    setPassword(password:string) {
      this.password = password; 
    }
  }
import { Option } from "./option.model";

export class Login {
  static model: any;
    email: string;
    password: string;

    setEmail(email:string) {
      this.email = email; 
    }
    setPassword(password:string) {
      this.password = password; 
    }
  }
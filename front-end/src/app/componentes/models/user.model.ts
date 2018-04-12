import { Option } from "./option.model";

export class User {
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  photo: string;
  departments: Array<Option>;
  authorities: Array<String>;
}
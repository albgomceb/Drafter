import { User } from "./user.model";

export class Department {
  id: number;
  name: String;
  isInput: Boolean;
  users: Array<User>;
}
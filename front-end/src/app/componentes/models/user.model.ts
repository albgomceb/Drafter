import { Option } from "./option.model";

export class User {
    id: number;
    version: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    picture: string;
    departments: Array<Option>;
  }
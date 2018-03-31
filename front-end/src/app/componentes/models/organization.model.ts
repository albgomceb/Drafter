import { Department } from "./department.model";

export class Organization {
  id: number;
  enterprise: String;
  description: String;
  address: String;
  phone: String;
  email: String;
  logo: String;
  departments: Array<Department>;
}
import { Option } from "./option.model";

export class Participant {
    role: string;
    hasAttended: boolean;
    user: Option;
    departments: Array<Option>;
  }
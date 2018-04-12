import { Option } from "./option.model";

export class Meeting {
  id: number;
  title: string;
  description: string;
  date: number;
  timer: number;
  attendants: Array<Option>;
  type: string;

  setAttendants(attendants: Array<Option>) {
    this.attendants = attendants;
  }
}
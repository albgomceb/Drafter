import { Option } from "./option.model";

export class Meeting {
    title: string;
    description: string;
    attendants: Array<Option>;
    type : string;

    setAttendants(attendants:Array<Option>) {
      this.attendants = attendants; 
    }
  }

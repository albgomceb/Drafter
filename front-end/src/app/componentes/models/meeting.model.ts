import { Option } from "./option.model";

export class Meeting {
    title: string;
    description: string;
    attendants: Array<string>

    setAttendants(attendants:Array<string>) {
      this.attendants = attendants; 
    }
  }
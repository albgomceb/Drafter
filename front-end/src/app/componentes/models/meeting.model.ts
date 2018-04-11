import { Option } from "./option.model";

export class Meeting {
    id: number;
    title: string;
    description: string;
    date: Date;
    image: string;
    timer: Date;
    hasfinished: boolean;
    numberOfMeeting: number;
    attendants: Array<Option>;
    type : string;

    setAttendants(attendants:Array<Option>) {
      this.attendants = attendants; 
    }
  }

import { Option } from "./option.model";

export class Meeting {
    id: number;
    title: string;
    description: string;
    date: number;
    image: string;
    timer: number;
    hasFinished: boolean;
    numberOfMeeting: number;
    attendants: Array<Option>;
    type : string;
    showNotification : Boolean;

  setAttendants(attendants: Array<Option>) {
    this.attendants = attendants;
  }
}
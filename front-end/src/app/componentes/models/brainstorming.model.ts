import { Idea } from './idea.model';
import { Meeting } from './meeting.model';

export class Brainstorming extends Meeting {
    votingMode:String;
    ideas:Array<Idea>
  }
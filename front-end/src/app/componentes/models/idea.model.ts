import { Vote } from './vote.model';
import { Brainstorming } from './brainstorming.model';
import { Pros } from './pros.model';
import { Cons } from './cons.model';

export class Idea {
  id: number;
  number: number;
  text: String;
  ratingValue:number;
  brainstormingId:number;
  pros: Array<Pros>;
  cons: Array<Cons>;
  votes:Array<Vote>;
}

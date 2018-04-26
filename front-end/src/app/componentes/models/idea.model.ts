import { Cons } from './cons.model';
import { Pros } from './pros.model';
import { Vote } from "./vote.model";

export class Idea {
    id: number;
    version: number;
    number: number;
    text: string;
    isInput: Boolean;
    pros: Array<Pros>;
    cons: Array<Cons>;
    votes: Array<Vote>;
}

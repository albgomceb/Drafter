import { Pros } from "../../models/pros";
import { Cons } from "../../models/cons";
import { Vote } from "./vote.model";

export class Idea {
    id: number;
    number: number;
    text: string;
    isInput: Boolean;
    pros: Array<Pros>;
    cons: Array<Cons>;
    votes: Array<Vote>;
}

import { Pros } from "../../models/pros";
import { Cons } from "../../models/cons";

export class Idea {
    id: number;
    number: number;
    text: string;
    pros: Array<Pros>;
    cons: Array<Cons>;
}
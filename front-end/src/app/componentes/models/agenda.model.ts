import { Conclusion } from "../../models/conclusion";

export class Agenda {
  id: number;
  number: number;
  description: String;
  isInput: Boolean;
  conclusions: Array<Conclusion>;
}
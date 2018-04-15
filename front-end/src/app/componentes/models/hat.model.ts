import { Conclusion } from "../../models/conclusion";
import { SixHatsConclusion } from "./conclusion.model";

export class Hat {
  id: number;
  color: String;
  order: number;
  conclusions: Array<SixHatsConclusion>;
}

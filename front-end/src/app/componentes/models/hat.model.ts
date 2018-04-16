import { Conclusion } from "../../models/conclusion";
import { SixHatsConclusion } from "./sixHatsConclusion.model";

export class Hat {
  id: number;
  version: number;
  color: String;
  order: number;
  conclusions: Array<SixHatsConclusion>;
}

import { Conclusion } from "../../models/conclusion";
import { HatConclusion } from "./HatConclusion.model";

export class Hat {
  id: number;
  version: number;
  color: String;
  order: number;
  hatConclusions: Array<HatConclusion>;
}

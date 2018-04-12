import { Participant } from './participant.model';
import { Idea } from './idea.model';

export class Vote {
  id: number;
  value: number;
  ideaId: number;
  participantId:number;
}

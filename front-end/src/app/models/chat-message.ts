import { RealTimeService } from './../services/real-time.service';

export class ChatMessage {
    constructor(private message: string, private userUUID: string, private time: string, private color: string) { }
}

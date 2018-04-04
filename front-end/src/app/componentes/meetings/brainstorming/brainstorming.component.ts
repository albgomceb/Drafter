import { OnInit, Component, Input, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'brainstorming',
    templateUrl: './brainstorming.component.html',
    styleUrls: ['./brainstorming.component.scss']
})
export class BrainstormingComponent implements OnInit {
    @Input()
    public meetingInfo:any;
    @Input()
    public meetingId:number;
    @Input()
    public attendants:Array<any>;
    
    @Output() finish = new EventEmitter<number>();

    public finishMeeting(meetingId:number){
        this.finish.emit(meetingId);
    };

    
    constructor() {}
    ngOnInit(){
    }

    
}
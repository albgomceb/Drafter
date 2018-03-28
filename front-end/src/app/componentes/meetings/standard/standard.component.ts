import { OnInit, Component, Input, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'standard',
    templateUrl: './standard.component.html',
    styleUrls: ['./standard.component.scss']
})
export class StandardComponent implements OnInit {
    @Input()
    public meetingInfo:any;
    @Input()
    public meetingId:number;
    
    @Output() finish = new EventEmitter<number>();

    public finishMeeting(meetingId:number){
        this.finish.emit(meetingId);
    };

    
    constructor() {}
    ngOnInit(){
    }

    
}
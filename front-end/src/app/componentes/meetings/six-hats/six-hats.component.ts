import { OnInit, Component, Input, EventEmitter, Output } from "@angular/core";
import { Hat } from "../../models/hat.model";
import { SixHatsService } from "../../services/sixhats.service";

@Component({
    selector: 'six-hats',
    templateUrl: './six-hats.component.html',
    styleUrls: ['./six-hats.component.scss']
})
export class SixHatsComponent implements OnInit {
    @Input()
    public meetingInfo:any;
    @Input()
    public meetingId:number;
    @Input()
    public stoped:boolean;
    
    
    @Input()
    public attendants:Array<any>;
    
    @Output() finish = new EventEmitter<number>();

    public finishMeeting(meetingId:number){
        this.finish.emit(meetingId);
    };
    
    constructor() {}
    
    ngOnInit(){
        //Here should be the code that determines which step of a six-hat meeting should be loaded.
    }

    
}
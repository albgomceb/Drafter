import { Participant } from './../../../models/participant.model';
import { OnInit, Component, Input, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DynamicMeetingService } from "../../../services/dynamic-meeting.service";
import { RealTimeService, WSResponseType } from "../../../../services/real-time.service";
import { User } from "../../../models/user.model";
import { UserService } from "../../../services/user.service";


@Component({
  selector: 'waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: []
})
export class WaitingRoomComponent implements OnInit {
  @Input()
  public meetingInfo : any;

  @Input()
  public meetingId:number;

  @Output()
  public nextStep: EventEmitter<number> = new EventEmitter<number>();

  public attendants : any[];
  public principal: Participant;
  public loaded: boolean;

  constructor(private activatedRoute: ActivatedRoute, private meetingService: DynamicMeetingService, private router: Router, private userService:UserService) { }

  ngOnInit() {
    this.loaded = false;
    this.userService.getLoginUser().subscribe(principal =>{
      this.principal = this.meetingInfo.attendants.find(x => x.username === principal.username);
      this.loaded = true;
    });
    this.attendants = this.meetingInfo.attendants
  }

  next() {
    this.nextStep.emit(this.meetingId);
  }

}    
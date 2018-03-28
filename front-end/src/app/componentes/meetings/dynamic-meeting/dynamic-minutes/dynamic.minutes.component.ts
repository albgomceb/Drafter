import { OnInit, Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DynamicMeetingService } from "../../../services/dynamic-meeting.service";


@Component({
    selector: 'dynamic-minutes',
    templateUrl: './dynamic-minutes.component.html',
    styleUrls: []
  })
  export class DynamicMinutesComponent implements OnInit {
    public meetingId :number;
    public meetingInfo:any;
    public users:Array<any>;

    constructor(private activatedRoute:ActivatedRoute,private meetingService: DynamicMeetingService, private router:Router){}

    ngOnInit(){
      this.activatedRoute.params.subscribe(params => {this.meetingId = params['id']});
      if(this.meetingId){
        this.meetingInfo = this.meetingService.getMeetingInfo(0);
        this.users = this.meetingInfo.users;
        
      }
    }
  }    
import { NgModule, Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { DynamicMeetingService } from '../../services/dynamic-meeting.service';
import { RealTimeService, WSResponseType } from '../../../services/real-time.service';


@Component({
  selector: 'dynamic-meeting',
  templateUrl: './dynamic-meeting.component.html',
  styleUrls: ['./dynamic-meeting.component.scss']
})
export class DynamicMeetingComponent implements OnInit {

  public meetingId :number;
  public meetingInfo:any={};
  public users:Array<any>;
  public isFinished:boolean;
  public showChat:boolean = false;

  constructor(private userService: UserService,
     private router:Router, private activatedRoute:ActivatedRoute, private meetingService:DynamicMeetingService,
    private realtimeService:RealTimeService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {this.meetingId = params['id']});
    if(this.meetingId){
      this.meetingService.getMeetingInfo(this.meetingId).subscribe((res:any) =>{
        this.meetingInfo = res;
        this.meetingInfo.isFinished = res.finished;
        if(this.meetingInfo.isFinished){
          this.router.navigate(['/minutes/'+this.meetingId]);
        }else{
          this.realtimeService.connect(this.meetingId, () => {
    
            this.realtimeService.register('step', [], step =>{
              this.meetingInfo.status = step.model.id;
              this.router.navigate(['/meeting/'+this.meetingId]);
            } );

            this.realtimeService.register('finish', [], finish =>{
              this.meetingInfo.isFinished = finish.model.id;
              this.router.navigate(['/minutes/'+this.meetingId]);
            } );
            this.realtimeService.subscribe();
          });
          this.users = res.attendants;
        }
      });
    }
  } 

  finishMeeting(meetingId:number){
    this.realtimeService.send('/meeting/finish/',WSResponseType.PUSH,'finish',{id:"",name:""});    
  }

  nextStep(meetingId:number){
    this.realtimeService.send('/meeting/nextStep/',WSResponseType.PUSH,'step',{id:"",name:""});    
  }

  toggleChat() {
    this.showChat = !this.showChat;
  }

}

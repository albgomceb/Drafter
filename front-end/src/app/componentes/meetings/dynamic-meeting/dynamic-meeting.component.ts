import { NgModule, Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { DynamicMeetingService } from '../../services/dynamic-meeting.service';
import { RealTimeService, WSResponseType } from '../../../services/real-time.service';
import { Option } from '../../models/option.model';


@Component({
  selector: 'dynamic-meeting',
  templateUrl: './dynamic-meeting.component.html',
  styleUrls: ['./dynamic-meeting.component.scss']
})
export class DynamicMeetingComponent implements OnInit, OnDestroy {

  public meetingId :number;
  public meetingInfo:any={};
  public thumbnail: Array<Option>;
  public users:Array<any>;
  public isFinished:boolean;
  public showChat:boolean = false;
  public showVideo:boolean = false;
  public loaded;
  public unreadedMsg: number;

  constructor(private userService: UserService,
    private router:Router, private activatedRoute:ActivatedRoute, private meetingService:DynamicMeetingService,
    public realtimeService:RealTimeService) {}

  ngOnInit() {
    this.loaded = false;
    this.activatedRoute.params.subscribe(params => {this.meetingId = params['id']});
    if(this.meetingId){
      this.meetingService.getMeetingInfo(this.meetingId).subscribe((res:any) =>{
        this.meetingInfo = res;
        this.meetingInfo.isFinished = res.finished;
        //Lista de participantes a mostrar
        this.thumbnail = this.meetingInfo.attendants;

        if(this.meetingInfo.isFinished){
          this.router.navigate(['/minutes/'+this.meetingId]);
        }else{
          this.realtimeService.connect(this.meetingId, () => {
            this.loaded = true;

            this.realtimeService.register('step', [], step =>{
              this.meetingInfo.status = step.model.id;
              this.router.navigate(['/meeting/'+this.meetingId]);
            } );

            this.realtimeService.register('finish', [], finish =>{
              this.meetingInfo.isFinished = finish.model.id;
              this.router.navigate(['/minutes/'+this.meetingId]);
            } );

            this.realtimeService.register('attendants', [], participant =>{
              
              let part = this.meetingInfo.attendants.find(att => att.id == participant.model.id);
              if(part) 
              part.hasAttended = participant.model.hasAttended
              else
              this.meetingInfo.attendants.push(participant.model);
            });
            this.realtimeService.subscribe();
            this.userService.getLoginUser().subscribe(logged =>{
              this.realtimeService.send('/meeting/attended/',WSResponseType.PUSH,'attendants',{id:logged.id,name:logged.username});
            })
          });
          this.users = res.attendants;
        }
      });
    }
  } 

  ngOnDestroy() {
    this.realtimeService.disconnect();
  }

  finishMeeting(meetingId:number){
    this.realtimeService.send('/meeting/finish/',WSResponseType.PUSH,'finish',{id:"",name:""});    
  }

  nextStep(meetingId:number){
    this.realtimeService.send('/meeting/nextStep/',WSResponseType.PUSH,'step',{id:"",name:""});    
  }

  toggleChat() {
    if(this.showChat == false && this.showVideo) {
      this.showVideo = false;
    }
    this.showChat = !this.showChat;
  }

  toggleVideo() {
    if(this.showVideo == false && this.showChat) {
      this.showChat = false;
    }
    this.showVideo = !this.showVideo;
  }

  receiveEventChat($event) {
    this.unreadedMsg = $event
  }

}

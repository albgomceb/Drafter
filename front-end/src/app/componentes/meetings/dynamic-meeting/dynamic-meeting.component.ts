import { LoginService } from './../../services/login.service';
import { NgModule, Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { DynamicMeetingService } from '../../services/dynamic-meeting.service';
import { RealTimeService, WSResponseType } from '../../../services/real-time.service';
import { Option } from '../../models/option.model';
import { User } from '../../models/user.model';

import * as $ from 'jquery';
import { MeetingService } from '../../services/meeting.service';


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
  public showInfo:boolean = true;
  public loaded;
  public unreadedMsg: number;
  public attendants: any[];
  public logged: User;
  public stoped: boolean;
  public joinAttendant:string;
  public leftAttendant:string;


  constructor(private loginService:LoginService, private userService: UserService,
    private router:Router, private activatedRoute:ActivatedRoute, private meetingService:DynamicMeetingService,
    public realtimeService:RealTimeService, private meetingService2: MeetingService,
    private route : ActivatedRoute) { }

  ngOnInit() {
    this.loaded = false;
    this.stoped = false;
    this.activatedRoute.params.subscribe(params => {this.meetingId = params['id']});

    this.meetingService2.isParticipant(this.meetingId).subscribe(res => {
      if(!res) {
        this.router.navigate(['home']);
        return;
      }

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

              this.realtimeService.register('step', [], step =>{
                this.meetingInfo.status = step.model.id;
                this.router.navigate(['/meeting/'+this.meetingId]);
              } );

              this.realtimeService.register('finish', [], finish =>{
                this.meetingInfo.isFinished = finish.model.id;
                this.router.navigate(['/minutes/'+this.meetingId]);
              } );

              //ALERT ON JOIN
              this.realtimeService.registerOnJoinUser((name,uuid) => {
                let part = this.meetingInfo.attendants.find(att => att.username == name);
                  if(part) {
                    var scope = this;
                    if(part.name != this.loginService.getPrincipal().name){
                      this.joinAttendant =  part.name;
                      setTimeout(function(){
                        scope.joinAttendant = null;
                      },3000);
                    }
                  }
                });

              //ALERT ON LEFT
              this.realtimeService.registerOnLeaveUser((name,uuid) => {
                let part = this.meetingInfo.attendants.find(att => att.username == name);
                  if(part) {
                    var scope = this;
                    if(part.name != this.loginService.getPrincipal().name){
                      this.leftAttendant =  part.name;
                      setTimeout(function(){
                        scope.leftAttendant = null;
                      },3000);
                    }
                  }
                });

              this.realtimeService.register('attendants', [], participant =>{
                let part = this.meetingInfo.attendants.find(att => att.id == participant.model.id);
                if(part) {
                  part.hasAttended = participant.model.hasAttended
                }else
                  this.meetingInfo.attendants.push(participant.model);
              });
              this.realtimeService.subscribe();

              this.logged = this.loginService.getPrincipal();
              this.realtimeService.send('/meeting/attended/',WSResponseType.PUSH,'attendants',{id:this.logged.id,name:this.logged.username});
              this.loaded = true;
            });
            this.users = res.attendants;
          }
        });
      }
    });
  } 

  ngOnDestroy() {
    if(this.logged != undefined)
      this.realtimeService.send('/meeting/quit/',WSResponseType.PUSH,'attendants',{id:this.logged.id,name:this.logged.username});
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

  toggleInfo() {
    this.showInfo = !this.showInfo;
  }

  receiveEventChat($event) {
    this.unreadedMsg = $event
  }

  changeChronometer(isPlay: boolean) {
    if(!isPlay) {
      window.blur();
    }

    this.stoped = !isPlay;
  }

}

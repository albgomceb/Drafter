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
  public loaded;
  public unreadedMsg: number;
  public attendants: any[];
  public logged: User;
  public stoped: boolean;


  constructor(private loginService:LoginService, private userService: UserService,
    private router:Router, private activatedRoute:ActivatedRoute, private meetingService:DynamicMeetingService,
    public realtimeService:RealTimeService, private meetingService2: MeetingService) {}

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
                    if(part.name != this.loginService.getPrincipal().name && part.hasAttended==false){
                      
                      //CREAR CADA ALERTA PARA IR AGREGANDO AL DOM
                      var alert = $( "<div class='alert alert-dismissible mx-auto' style='width:20rem;background-color: #4CAF50;color: #fff;border-radius:5px;text-align: center;box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.19);'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>"+part.name+"</strong> has joined to meeting</div>" );
                      $("#alerts").append(alert);

                      //IR ELIMINANDO ALERTAS CONFORME PASEN 4 SEG
                      setTimeout(function(){
                        alert.remove();
                      },4000);

                    }
                  }
                });

              //ALERT ON LEAVE
              this.realtimeService.registerOnLeaveUser((name,uuid) => {
                let part = this.meetingInfo.attendants.find(att => att.username == name);
                  if(part) {
                    if(part.name != this.loginService.getPrincipal().name){

                      //CREAR CADA ALERTA PARA IR AGREGANDO AL DOM
                      var alert = $( "<div class='alert alert-dismissible mx-auto' style='width:20rem;background-color: #ff9800;color: #fff;border-radius:5px;text-align: center;box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.19);'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>"+part.name+"</strong> has left the meeting</div>" );
                      $("#alerts").append(alert);

                      //IR ELIMINANDO ALERTAS CONFORME PASEN 4 SEG
                      setTimeout(function(){
                        alert.remove();
                      },4000);
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

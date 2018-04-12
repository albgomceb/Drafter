import { NgModule, Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { DynamicMeetingService } from '../../services/dynamic-meeting.service';


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

  constructor(private userService: UserService, private router:Router, private activatedRoute:ActivatedRoute, private meetingService:DynamicMeetingService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {this.meetingId = params['id']});
    if(this.meetingId){
      this.meetingService.getMeetingInfo(this.meetingId).subscribe((res:any) =>{
        this.meetingInfo = res;
        this.meetingInfo.isFinished = res.finished;
        if(this.meetingInfo.isFinished){
          this.router.navigate(['/minutes/'+this.meetingId]);
        }else{
          this.users = res.attendants;
        }
      });
    }
    

  } 

  finishMeeting(meetingId:number){
    this.meetingService.finish(meetingId).subscribe(res =>{
      this.router.navigate(['/minutes/'+meetingId]);
    })
  }
  nextStep(meetingId:number){
    
    this.meetingService.nextStep(meetingId).subscribe(res =>{
      this.meetingInfo.status = res;
      this.router.navigate(['/meeting/'+this.meetingId])
    })
  }

}

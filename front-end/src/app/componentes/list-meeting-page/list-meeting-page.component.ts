import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MeetingService } from '../services/meeting.service';
import { Meeting } from '../models/meeting.model';


@Component({
  selector: 'list-meeting-page',
  templateUrl: './list-meeting-page.component.html',
  styleUrls: ['./list-meeting-page.component.scss']
})
export class ListMeetingPageComponent implements OnInit {

  public meetings: Array<Meeting>;
  public userId: number; 

  errorListUsers:boolean = false;

  constructor(private meetingService: MeetingService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.userId = 11;
    // Cogemos las meeting que el usuario tenga
    this.meetingService.getMeetingsByUser(this.userId).subscribe(
      data => 
      {
        this.meetings = data;
      },
      error => {
        this.errorListUsers = true;
      }
    );
  }

  seeMeeting(meetingId: number){
    
  }

  seeMinutesMeeting(meetingId: number){
    this.meetingService.getMeeting(meetingId).subscribe(res =>{
      this.router.navigate(['/minutes/' + meetingId]);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MeetingService } from '../services/meeting.service';
import { Meeting } from '../models/meeting.model';
import { MeetingPagination } from '../models/meetingPagination.model';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';


@Component({
  selector: 'list-meeting-page',
  templateUrl: './list-meeting-page.component.html',
  styleUrls: ['./list-meeting-page.component.scss']
})
export class ListMeetingPageComponent implements OnInit {

  public meetingPagination : MeetingPagination;
  public numberOfPage : number;
  public meetings: Array<Meeting>;
  public user: User;
  public today: number;

  errorListUsers:boolean = false;

  constructor(private userService: UserService,
    private meetingService: MeetingService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.userService.getLoginUser().subscribe(
      data => 
      {
        this.user = data;
      },
      error => {
        this.errorListUsers = true;
      }
    );

    this.activatedRoute.params.subscribe((params: Params) => {
      this.numberOfPage = params['p'];
    });

    this.today = new Date().getTime();

    // Cogemos las meeting que el usuario tenga
    this.meetingService.getMeetingsByUser(this.user.id, this.numberOfPage).subscribe(
      data => 
      {
        this.meetingPagination = data;
        this.meetings = data.beans;
      },
      error => {
        this.errorListUsers = true;
      }
    );
  }

  getMeetingsByUser(userId: number, p: number){
    this.meetingService.getMeetingsByUser(userId, p).subscribe(res =>{
      this.router.navigate(['/meeting/list/' + userId + '/page/' + p]);
    })
  }

  goToMeeting(meetingId: number){
    this.meetingService.getMeeting(meetingId).subscribe(res =>{
      this.router.navigate(['/meeting/' + meetingId]);
    });
  }

  seeMinutesMeeting(meetingId: number){
    this.meetingService.getMeeting(meetingId).subscribe(res =>{
      this.router.navigate(['/minutes/' + meetingId]);
    });
  }

}

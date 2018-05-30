import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MeetingService } from '../services/meeting.service';
import { MeetingPagination } from '../models/meetingPagination.model';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Meeting } from '../models/meeting.model';


@Component({
  selector: 'list-meeting-page',
  templateUrl: './list-meeting-page.component.html',
  styleUrls: ['./list-meeting-page.component.scss']
})
export class ListMeetingPageComponent implements OnInit {

  public meetingPagination : MeetingPagination;
  public userId: number;
  public previousNumberOfPage : number;
  public numberOfPage : number;
  public nextNumberOfPage : number;
  public today: number;
  public loading: boolean;

  errorListUsers:boolean = false;

  constructor(private userService: UserService,
    private meetingService: MeetingService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['userId'];
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      this.numberOfPage = params['p'];
    });

    this.today = new Date().getTime();
    var meetings = new Array<Meeting>();
    this.meetingPagination = new MeetingPagination();
    this.meetingPagination.beans = meetings;

    this.meetingService.getMeetingsByUser(this.userId, this.numberOfPage).subscribe(
      data => 
      {
        this.meetingPagination = data;
        this.numberOfPage = this.meetingPagination.numberOfPage;
        this.previousNumberOfPage = Number(this.numberOfPage) - 1;
        this.nextNumberOfPage = Number(this.numberOfPage) + 1;
        this.loading = false;
      },
      error => {
        this.errorListUsers = true;
        this.loading = false;
      }
    );
  }

  getMeetingsByUser(userId: number, p: number) {
    this.meetingService.getMeetingsByUser(userId, p).subscribe(res =>{
      this.router.navigate(['/meeting/list/' + userId + '/page/' + p]);
    })   
  }

  goToMeeting(meetingId: number) {
    this.meetingService.getMeeting(meetingId).subscribe(res =>{
      this.router.navigate(['/meeting/' + meetingId]);
    });
  }

  seeMinutesMeeting(meetingId: number) {
    this.meetingService.getMeeting(meetingId).subscribe(res =>{
      this.router.navigate(['/minutes/' + meetingId]);
    });
  }

}

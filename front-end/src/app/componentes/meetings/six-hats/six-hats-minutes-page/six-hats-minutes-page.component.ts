import { Component, OnInit, Input } from '@angular/core';
import { SixHats } from '../../../models/sixHats.model';
import { Meeting } from '../../../models/meeting.model';
import { MeetingService } from '../../../services/meeting.service';
import { SixHatsService } from '../../../services/sixhats.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'six-hats-minutes-page',
  templateUrl: './six-hats-minutes-page.component.html',
  styleUrls: ['./six-hats-minutes-page.component.scss']
})
export class SixHatsMinutesPageComponent implements OnInit {

  meeting: Meeting = new Meeting();
  sixHats: SixHats = new SixHats();
  @Input() 
  public meetingId: number;
  @Input() 
  public meetingInfo: any;

  constructor(private meetingService: MeetingService, 
    private sixHatsService: SixHatsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
    this.meetingService.getMeeting(this.meetingId).subscribe(data => {
      this.meeting = data;
      this.sixHatsService.getSixHatsByMeeting(this.meetingId).subscribe(data => {
        this.sixHats = data;
      });
    });
  };
}
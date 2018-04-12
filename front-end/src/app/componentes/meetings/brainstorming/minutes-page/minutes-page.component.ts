import { Component, OnInit, Input } from '@angular/core';
import { MeetingService } from '../../../services/meeting.service';
import { ActivatedRoute } from '@angular/router';
import { Idea } from '../../../models/idea.model';
import { Pros } from '../../../models/pros.model';
import { Cons } from '../../../models/cons.model';
import { Meeting } from '../../../models/meeting.model';
import { BrainStormingService } from '../../../services/brainstorming.service';

@Component({
  selector: 'minutes-page',
  templateUrl: './minutes-page.component.html',
  styleUrls: ['./minutes-page.component.scss']
})
export class MinutesPageComponent implements OnInit {

  meeting: Meeting = new Meeting();
  model:any[];
  ideas: Array<Idea>;
  pros: Array<Pros> = [];
  cons: Array<Cons> = [];
  @Input() meetingId: number;
  @Input() meetingInfo: any;

  constructor(private meetingService: MeetingService, 
    private brainstormingService: BrainStormingService,
    private activatedRoute: ActivatedRoute) { }

ngOnInit() {
this.meetingService.getMeeting(this.meetingId).subscribe(data => {
this.meeting = data;
console.log(this.meeting);
});
this.brainstormingService.getIdeas(this.meetingId).subscribe(data => {
this.ideas = data;
this.model = [];
for(let id of this.ideas){
var val = {
idea: id,
pros: id.pros,
cons: id.cons
}

this.model.push(val);
}
});
};

}

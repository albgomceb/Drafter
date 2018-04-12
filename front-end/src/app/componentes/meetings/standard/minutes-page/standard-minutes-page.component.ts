import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Meeting2 } from '../../../models/meeting.model2';
import { Agenda2 } from '../../../models/agenda.model2';
import { Conclusion } from '../../../../models/conclusion';
import { MeetingService } from '../../../services/meeting.service';
import { Option } from '../../../models/option.model';

@Component({
  selector: 'standard-minutes-page',
  templateUrl: './standard-minutes-page.component.html',
  styleUrls: ['./standard-minutes-page.component.scss']
})
export class StandardMinutesPageComponent implements OnInit {
  
  meeting: Meeting2 = new Meeting2();
  model:any[];
  agendas: Array<Agenda2>;
  conclusions: Array<Conclusion> = [];
  @Input() meetingId: number;
  @Input() meetingInfo: any;
  

  constructor(private meetingService: MeetingService, 
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.meetingService.getMeeting(this.meetingId).subscribe(data => {
       this.meeting = data;
       console.log(this.meeting);
    });
    this.meetingService.getAgendas(this.meetingId).subscribe(data => {
      this.agendas = data;
      this.model = [];
      for(let ag of this.agendas){
        var val = {
          agenda: ag,
          conclusion:ag
        }

       
        this.model.push(val);
      }
    });
  };

}

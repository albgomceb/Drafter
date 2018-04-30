import { Meeting } from './../../../models/meeting.model';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  
  meeting: Meeting = new Meeting();
  leader:Option;
  attendants:Array<Option>;
  model:any[];
  agendas: Array<Agenda2>;
  conclusions: Array<Conclusion> = [];
  @Input() meetingId: number;
  @Input() meetingInfo: any;
  

  constructor(private meetingService: MeetingService, 
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    //OBTENER SESSION LEADER
    this.attendants = this.meetingInfo.attendants;
    this.attendants.forEach(at => {
      if(at.role=="LEADER")
        this.leader = at;
    });

    this.meetingService.getMeeting(this.meetingId).subscribe(data => {
       this.meeting = data;
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

  public format(): string {
    var s: number = this.meeting.timer;
    var m: number = Math.floor(this.meeting.timer/60);
    var h: number = Math.floor(m/60);

    m -= 60*h;
    s -= 3600*h + 60*m;

    var sm: string = ("00" + m).slice(-2);
    var ss: string = ("00" + s).slice(-2);

    return "" + h + ":" + sm + ":" + ss;
  }

}


import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { RealTimeService, WSResponseType } from '../../../../services/real-time.service';
import { AgendaService } from '../../../services/agenda.service';
import { Agenda } from '../../../models/agenda.model';
import { Conclusion } from '../../../../models/conclusion';
import { MeetingService } from '../../../services/meeting.service';

@Component({
  selector: 'standard-meeting',
  templateUrl: './standard-meeting.component.html',
  styleUrls: ['./standard-meeting.component.scss']
})
export class StandardMeetingComponent implements OnInit {
  @Input()
  public meetingInfo:any;
  @Output()
  public finishMeeting = new EventEmitter<number>();

  public agendas: Array<Agenda>;
  public hasEdit: boolean = true;
  public meetingId: number;

  constructor(private activeRoute: ActivatedRoute, private realTimeService: RealTimeService, private agendaService: AgendaService,
  private router:Router, private meetingService: MeetingService) { }

  ngOnInit() {

    var meetingId = this.activeRoute.snapshot.params['id'];
    this.meetingService.isParticipant(meetingId).subscribe(res => {
      if(!res) {
        this.router.navigate(['home']);
        return;
      }

      this.agendas = new Array<Agenda>();
      this.meetingId = meetingId; 
      this.agendaService.getAgendasByMeeting(this.meetingId).subscribe( agenda => {
      this.agendas = agenda;
      });
      this.realTimeService.connect(this.meetingId, () => {
        var i = 1;
        for(var cs of this.agendas) {
          this.realTimeService.register('c'+i, cs.conclusions);
          i++;
        }
        this.realTimeService.subscribe();
      });
    })

  }


  edit(event) {
    if(this.hasEdit) {
        var iagenda = event.target.dataset.iagenda;
        var iconclusion = event.target.dataset.iconclusion;
        var content = event.target.textContent.trim();
        var conclusion: Conclusion = this.agendas[iagenda-1].conclusions[iconclusion];
        conclusion.conclusion = content;

        // Delete if blank and else update
        if(!content || content.length==0 || /^\s*$/.test(content)) {
          this.realTimeService.send('/conclusion/delete/' + conclusion.id + "/", 
                                  WSResponseType.POP, 
                                  'c'+iagenda,  
                                  {}, 
                                  {index: iconclusion});
        } else {
          this.realTimeService.send('/conclusion/save/', 
                                  WSResponseType.SET, 
                                  'c'+iagenda,  
                                  this.agendas[iagenda-1].conclusions[iconclusion], 
                                  {index: iconclusion});
        }
    }
  }

  enter(event) {
    if(event.keyCode == 13) {
      event.target.blur();
      return false;
    }

    return true;
  }

  addConclusion(event) {
    var index = event.target.dataset.index;
    var agenda = this.agendas[index-1];

    // Only one empty
    var i = 0;
    for(var c of agenda.conclusions) {
      if(!c.conclusion || c.conclusion.length==0 || /^\s*$/.test(c.conclusion))
        agenda.conclusions.splice(i, 1);
      i++;
    }

    agenda.conclusions.push({id: 0, agendaId: agenda.id, conclusion: ""});
  }

  finish(){
    this.finishMeeting.emit(this.meetingId);
  }

}
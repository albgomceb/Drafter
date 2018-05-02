import { UserService } from './../../../services/user.service';
import { Participant } from './../../../models/participant.model';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { RealTimeService, WSResponseType } from '../../../../services/real-time.service';
import { AgendaService } from '../../../services/agenda.service';
import { Agenda } from '../../../models/agenda.model';
import { Conclusion } from '../../../../models/conclusion';
import { MeetingService } from '../../../services/meeting.service';

import * as $ from 'jquery';


@Component({
  selector: 'standard-meeting',
  templateUrl: './standard-meeting.component.html',
  styleUrls: ['./standard-meeting.component.scss']
})
export class StandardMeetingComponent implements OnInit {
  @Input()
  public meetingInfo: any;
  @Output()
  public finishMeeting = new EventEmitter<number>();

  public agendas: Array<Agenda>;
  public hasEdit: boolean = true;
  public meetingId: number;

  constructor(private activeRoute: ActivatedRoute, private realTimeService: RealTimeService, private agendaService: AgendaService,
    private router: Router, private userService: UserService) { }

  public participant: Participant;
  ngOnInit() {
    var meetingId = this.activeRoute.snapshot.params['id'];
    this.meetingId = meetingId;
    
    this.userService.getParticipant(this.meetingId).subscribe(participant => {
      this.participant = participant;
    });

    
    this.agendas = new Array<Agenda>();
    for (var a of this.agendas)
      a.conclusions = new Array<Conclusion>();
    this.agendaService.getAgendasByMeeting(this.meetingId).subscribe(agenda => {
      this.agendas = agenda;
      this.realTimeService.connect(this.meetingId, () => {
        var i = 0;
        for (var cs of this.agendas) {
          this.realTimeService.register('c' + i, cs.conclusions);
          i++;
        }
        this.realTimeService.subscribe();
      });
    });

  }

  addConclusion(index: number) {
    for(var c of this.agendas[index].conclusions) {
      if(c.isInput) {
        this.setFocus();
        return;
      }
    }

    var length = this.agendas[index].conclusions.length;
    this.agendas[index].conclusions.push(new Conclusion());
    this.agendas[index].conclusions[length].isInput = true;
    this.agendas[index].conclusions[length].conclusion = "";

    this.setFocus();
  }

  removeConclusion(c, i, index) {
    if (!c.id || c.id == 0)
      this.agendas[i].conclusions.splice(index, 1);
    else
      this.deleteConclusion(c.id, i);
  }

  private deleteConclusion(id: number, index: number) {
    this.realTimeService.send('/conclusion/delete/' + id + "/",
      WSResponseType.POP,
      'c' + index,
      {},
      { id: id });
  }

  convert(conclusion, index: number) {
    setTimeout(() => {
      if (conclusion.isInput) {
        if (conclusion.conclusion.trim().length != 0) {
          conclusion.isInput = false;
          conclusion.agendaId = this.agendas[index].id;
          this.realTimeService.send('/conclusion/save/',
            WSResponseType.PUSH,
            'c' + index,
            conclusion,
            { id: conclusion.id | 0 });

          if (conclusion.id == undefined || conclusion.id == 0) {
            this.addConclusion(index);
          }
        } else if (conclusion.id != undefined && conclusion.id != 0) {
          this.deleteConclusion(conclusion.id, index);
        }
      } else {
        var i = 0;
        for (var c of this.agendas[index].conclusions) {
          if (c.isInput)
            c.isInput = false;
          if (c.conclusion.trim().length == 0)
            this.agendas[index].conclusions.splice(i, 1);

          i++
        }

        conclusion.isInput = true;
        this.setFocus();
      }

    }, 0);  // This fix a Angular bug
  }


  killFocus(event) {
    event.target.blur();
  }

  setFocus() {
    setTimeout(() => {
      var e = $('textarea')[0];
      if (e)
        e.focus();
    }, 0);
  }

  finish(){
    this.finishMeeting.emit(this.meetingId);
  }

}
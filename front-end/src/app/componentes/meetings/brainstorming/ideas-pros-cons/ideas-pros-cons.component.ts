import { UserService } from './../../../services/user.service';
import { Participant } from './../../../models/participant.model';
import { Cons } from './../../../models/cons.model';
import { Pros } from './../../../models/pros.model';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Idea } from '../../../models/idea.model';
import { Router, ActivatedRoute } from '@angular/router';
import { IdeaService } from '../../../services/idea.service';
import { ProsService } from '../../../../services/pros.service';
import { ConsService } from '../../../../services/cons.service';
import { RealTimeService, WSResponseType } from '../../../../services/real-time.service';
import { MeetingService } from '../../../services/meeting.service';
import * as $ from 'jquery';
import { leave } from '@angular/core/src/profile/wtf_impl';


@Component({
  selector: 'ideas-pros-cons',
  templateUrl: './ideas-pros-cons.component.html',
  styleUrls: ['./ideas-pros-cons.component.scss']
})
export class IdeasProsConsComponent implements OnInit, OnDestroy {

  public ideas: Array<Idea>;
  public errorListIdeas: boolean = false;
  public hasEdit: boolean = true;
  @Input()
  public meetingId: number;
  @Output()
  public nextStep: EventEmitter<number> = new EventEmitter<number>();


  constructor(private ideaService: IdeaService,
    private realTimeService: RealTimeService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  public participant: Participant;
  ngOnInit() {
    this.userService.getParticipant(this.meetingId).subscribe(participant => {
      this.participant = participant;
    });

    var meetingId = this.activeRoute.snapshot.params['id'];

    this.ideaService.getIdeasByMeeting(this.meetingId).subscribe(
      data => {
        this.ideas = data;
        this.realTimeService.connect(this.meetingId, () => {
          var i = 0;
          for (var idea of this.ideas) {
            this.realTimeService.register('p' + i, idea.pros);
            this.realTimeService.register('c' + i, idea.cons);
            i++;
          }
          this.realTimeService.subscribe();
        });

      },
      error => {
        this.errorListIdeas = true;
      }
    );

  }

  ngOnDestroy() {
    var i = 0;
    for (var idea of this.ideas) {
      this.realTimeService.unregister('p' + i);
      this.realTimeService.unregister('c' + i);
      i++;
    }
  }

  enter(event) {
    if (event.keyCode == 13) {
      event.target.blur();
      return false;
    }

    return true;
  }


  addPro(event) {
    var index = event.target.dataset.index;
    for (var e of this.ideas[index].pros)
      if (e.isInput)
        return;

    var length = this.ideas[index].pros.length;
    this.ideas[index].pros.push(new Pros());
    this.ideas[index].pros[length].isInput = true;

    this.setFocus();
  }

  addCon(event) {
    var index = event.target.dataset.index;
    for (var e of this.ideas[index].cons)
      if (e.isInput)
        return;

    var length = this.ideas[index].cons.length;
    this.ideas[index].cons.push(new Cons());
    this.ideas[index].cons[length].isInput = true;

    this.setFocus();
  }

  next() {
    this.nextStep.emit(this.meetingId);
  }


  convert(any) {
    any.isInput = true;
    this.setFocus();
  }

  killfocusPros(p: Pros, index: number, i: number) {
    p.isInput = false;
    var text = p.pros ? p.pros.trim() : '';
    if (text.length == 0) {
      if (p.id != undefined && p.id != 0)
        this.realTimeService.send('/pros/delete/' + p.id + '/', WSResponseType.POP, 'p' + index, {}, { id: p.id });
      this.ideas[index].pros.splice(i, 1);
    } else {
      p.numberPros = 1;
      p.ideaId = this.ideas[index].id;
      this.realTimeService.send('/pros/savePro/', WSResponseType.PUSH, 'p' + index, p, { id: p.id | 0 });
    }
  }

  killfocusCons(c: Cons, index: number, i: number) {
    c.isInput = false;
    var text = c.cons ? c.cons.trim() : '';
    if (text.length == 0) {
      if (c.id != undefined && c.id != 0)
        this.realTimeService.send('/cons/delete/' + c.id + '/', WSResponseType.POP, 'c' + index, {}, { id: c.id });
      this.ideas[index].cons.splice(i, 1);
    } else {
      c.numberCons = 1;
      c.ideaId = this.ideas[index].id;
      this.realTimeService.send('/cons/saveCon/', WSResponseType.PUSH, 'c' + index, c, { id: c.id | 0 });
    }
  }

  setFocus() {
    setTimeout(() => {
      var e = $('input')[0];
      if (e)
        e.focus();
    }, 0);
  }
}

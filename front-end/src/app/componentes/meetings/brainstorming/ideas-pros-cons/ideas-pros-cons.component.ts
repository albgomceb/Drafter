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
    private meetingService: MeetingService,
    private router: Router) { }

  ngOnInit() {

    var meetingId = this.activeRoute.snapshot.params['id'];
    this.meetingService.isParticipant(meetingId).subscribe(res => {
      if (!res) {
        this.router.navigate(['home']);
        return;
      }

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
    });

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
    console.log(this.ideas[index].pros)
    for (var e of this.ideas[index].pros)
      if (!e.pros || e.pros.trim().length == 0)
        return;

    this.ideas[index].pros.push(new Pros());
  }

  addCon(event) {
    var index = event.target.dataset.index;
    for (var e of this.ideas[index].cons)
      if (!e.cons || e.cons.trim().length == 0)
        return;

    this.ideas[index].cons.push(new Cons());
  }

  next() {
    this.nextStep.emit(this.meetingId);
  }


  convert(any) {
    any.isInput = true;
  }

  killfocusPros(p: Pros, index: number) {
    p.isInput = false;
    var text = p.pros.trim();
    if (text.length == 0) {
      this.realTimeService.send('/pros/delete/' + p.id + '/', WSResponseType.POP, 'p' + index, {}, { id: p.id });
    } else {
      p.numberPros = 1;
      p.ideaId = this.ideas[index].id;
      this.realTimeService.send('/pros/savePro/', WSResponseType.PUSH, 'p' + index, p, { id: p.id, noself: true });
    }
  }

  killfocusCons(c: Cons, index: number) {
    c.isInput = false;
    var text = c.cons.trim();
    if (text.length == 0) {
      this.realTimeService.send('/cons/delete/' + c.id + '/', WSResponseType.POP, 'c' + index, {}, { id: c.id });
    } else {
      c.numberCons = 1;
      c.ideaId = this.ideas[index].id;
      this.realTimeService.send('/cons/saveCon/', WSResponseType.PUSH, 'c' + index, c, { id: c.id, noself: true });
    }
  }
}

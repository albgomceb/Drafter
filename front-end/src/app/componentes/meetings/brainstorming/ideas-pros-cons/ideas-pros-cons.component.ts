import { Cons } from './../../../models/cons.model';
import { Pros } from './../../../models/pros.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Idea } from '../../../models/idea.model';
import { Router, ActivatedRoute } from '@angular/router';
import { IdeaService } from '../../../services/idea.service';
import { ProsService } from '../../../../services/pros.service';
import { ConsService } from '../../../../services/cons.service';
import { RealTimeService, WSResponseType } from '../../../../services/real-time.service';


@Component({
  selector: 'ideas-pros-cons',
  templateUrl: './ideas-pros-cons.component.html',
  styleUrls: ['./ideas-pros-cons.component.scss']
})
export class IdeasProsConsComponent implements OnInit {

  public ideas: Array<Idea>;
  public errorListIdeas:boolean = false;
  public hasEdit: boolean = true;
  @Input()
  public meetingId: number;
  @Output()
  public nextStep: EventEmitter<number> = new EventEmitter<number>();
  

  constructor(private ideaService: IdeaService, private realTimeService: RealTimeService, private activeRoute: ActivatedRoute,) { }

  ngOnInit() {

    this.meetingId = this.activeRoute.snapshot.params['id'];

    this.ideaService.getIdeasByMeeting(this.meetingId).subscribe(
      data => 
      {
        this.ideas = data;
        this.realTimeService.connect(this.meetingId, () => {
          var i = 0;
          for(var idea of this.ideas) {
            this.realTimeService.register('p'+i, idea.pros);
            this.realTimeService.register('c'+i, idea.cons);
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

  editPro(event, p: Pros, ii: number, i: number) {
    var text = event.target.textContent.trim();
    if(text.length == 0) {
      this.realTimeService.send('/pros/delete/' + p.id + '/', WSResponseType.POP, 'p'+ii, {}, {id: p.id});
    } else {
      p.pros = text;
      p.numberPros = 1;
      p.ideaId = this.ideas[ii].id;
      this.realTimeService.send('/pros/savePro/', WSResponseType.PUSH, 'p'+ii, p, {id: p.id});

      if(!p.id || p.id == 0)
        this.ideas[ii].cons.splice(i, 1);
    }
  }

  editCon(event, c: Cons, ii: number, i: number) {
    var text = event.target.textContent.trim();
    if(text.length == 0) {
      this.realTimeService.send('/cons/delete/' + c.id + '/', WSResponseType.POP, 'c'+ii, {}, {id: c.id});
    } else {
      c.cons = text;
      c.numberCons = 1;
      c.ideaId = this.ideas[ii].id;
      this.realTimeService.send('/cons/saveCon/', WSResponseType.PUSH, 'c'+ii, c, {id: c.id});

      if(!c.id || c.id == 0)
        this.ideas[ii].cons.splice(i, 1);
    }
  }

  enter(event) {
    if(event.keyCode == 13) {
      event.target.blur();
      return false;
    }

    return true;
  }


  addPro(event) {
    var index = event.target.dataset.index;
    console.log(this.ideas[index].pros)
    for(var e of this.ideas[index].pros)
      if(!e.pros || e.pros.trim().length == 0)
        return;

    this.ideas[index].pros.push(new Pros());
  }

  addCon(event) {
    var index = event.target.dataset.index;
    for(var e of this.ideas[index].cons)
      if(!e.cons || e.cons.trim().length == 0)
        return;
        
    this.ideas[index].cons.push(new Cons());
  }

  next(){
    this.nextStep.emit(this.meetingId);
  }

}

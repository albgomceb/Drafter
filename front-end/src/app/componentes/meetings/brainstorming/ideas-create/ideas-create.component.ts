import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IdeaService } from '../../../services/idea.service';
import { Idea } from '../../../models/idea.model';
import { DynamicMeetingService } from '../../../services/dynamic-meeting.service';
import { RealTimeService, WSResponseType } from '../../../../services/real-time.service';
import { MeetingService } from '../../../services/meeting.service';
import * as $ from 'jquery';


@Component({
  selector: 'ideas-create',
  templateUrl: './ideas-create.component.html',
  styleUrls: ['./ideas-create.component.scss']
})

export class IdeasCreateComponent implements OnInit, OnDestroy {

  public entradas: Array<Idea>;
  @Input()
  public meetingId: number;
  @Input()
  public meetingInfo: any;

  @Output()
  public nextStep = new EventEmitter<number>();

  constructor(private ideaService: IdeaService,
    private dynamicMeetingService: DynamicMeetingService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private realTimeService: RealTimeService,
    private meetingService: MeetingService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    var meetingId = this.activeRoute.snapshot.params['id'];
    this.meetingService.isParticipant(meetingId).subscribe(res => {
      if(!res) {
        this.router.navigate(['home']);
        return;
      }

      this.ideaService.getIdeasByMeeting(this.meetingId).subscribe( res => {
        this.entradas = res;
        
        var idea = new Idea();
        idea.isInput = true;
        idea.text = "";
        this.entradas.push(idea);

        this.realTimeService.connect(this.meetingId, () => {
          this.setFocus();

          this.realTimeService.register('entradas', this.entradas);
          this.realTimeService.subscribe();
        });
      });
    });
  }

  ngOnDestroy() {
    this.realTimeService.unregister('entradas');
  }

  next() {
    this.nextStep.emit(this.meetingId);
  }

  addIdea(){                       
    for(var en of this.entradas)
      if(en.isInput)
        return;

    var length = this.entradas.length;
    this.entradas.push(new Idea());
    this.entradas[length].isInput = true;
    this.entradas[length].text = "";

    this.setFocus();
  } 

  removeIdea(entrada : Idea, entradasIndex : number){ 
    if(!entrada.id || entrada.id == 0)
      this.entradas.splice(entradasIndex, 1);
    else
      this.deleteIdea(entrada.id);
  }

  private deleteIdea(id: number) {
    this.realTimeService.send('/idea/delete/' + id + '/', 
                                    WSResponseType.POP, 
                                    'entradas',  
                                    {}, 
                                    {id: id});
  }

  convert(entrada){
    setTimeout(() => {
      entrada.number = 1;
      if(entrada.isInput) {
        if(this.checkNotBlank(entrada.text)) {
          entrada.isInput = false;
          this.realTimeService.send('/idea/save/', 
                                      WSResponseType.PUSH, 
                                      'entradas',  
                                      entrada, 
                                      {id: entrada.id|0});

          if(entrada.id == undefined || entrada.id == 0) {
            this.addIdea();
          }
        } else if(entrada.id != undefined && entrada.id != 0) {
          this.deleteIdea(entrada.id);
        }
      } else {
        var i=0;
        for(var en of this.entradas) {
          if(en.isInput)
            en.isInput = false;
          if(en.text.trim().length == 0)
            this.entradas.splice(i, 1);

          i++
        }

        entrada.isInput = true;
        this.setFocus();
      }

    }, 0);  // This fix a Angular bug
  }

  killFocus(event) {
    event.target.blur();
  }

  setFocus() {
    setTimeout(() => {
      var e = $('input')[0];
      if(e)
        e.focus();
    }, 0);
  }

  checkNotBlank(string : String) : boolean{
    if(!string)
      return false;

    var res = true;

    if(string.trim().length == 0){
      res = false;
    }

    return res;
  }
}


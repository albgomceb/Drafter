import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IdeaService } from '../../../services/idea.service';
import { Idea } from '../../../models/idea.model';
import { DynamicMeetingService } from '../../../services/dynamic-meeting.service';
import { RealTimeService, WSResponseType } from '../../../../services/real-time.service';


@Component({
  selector: 'ideas-create',
  templateUrl: './ideas-create.component.html',
  styleUrls: ['./ideas-create.component.scss']
})

export class IdeasCreateComponent implements OnInit {

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
    private realTimeService: RealTimeService) { }

  ngOnInit() {
    this.ideaService.getIdeasByMeeting(this.meetingId).subscribe( res => {
      this.entradas = res;
      
      var idea = new Idea();
      idea.isInput = true;
      idea.text = "";
      this.entradas.push(idea);

      this.realTimeService.connect(this.meetingId, () => {
        this.realTimeService.register('entradas', this.entradas);
        this.realTimeService.subscribe();
      });
    });
  }

  saveIdea(ideas : Idea[]){
    // Fix temporal para que no mande ideas vacias (que las duplica)
    var temp = new Array<Idea>();
    for(var ide of ideas)
      if(ide.text && ide.text.trim() != '')
        temp.push(ide);

      this.ideaService.saveIdea(temp, this.meetingId).subscribe(res =>{
      //To Do: cambiar ruta
      this.nextStep.emit(this.meetingId);
    });
  }

  addIdea(){
    var i=0;                            
    for(var en of this.entradas) {
      if(!en.text || en.text.trim().length == 0)
        this.entradas.splice(i, 1);
      
      i++;
    }

    var length = this.entradas.length;
    this.entradas.push(new Idea());
    this.entradas[length].isInput = true;
    this.entradas[length].text = "";
  } 

  removeIdea(entrada : Idea, entradasIndex : number){ 
    var i=0;
    for(var en of this.entradas) {
      if(!en.text || en.text.trim().length == 0) {
        this.entradas.splice(i, 1);
        return;
      }
      i++;
    }
    
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
    entrada.number = 1;

    //Si la actual entrada tiene longitud > 0 y además la entrada es un input, se convierte en texto
    if(this.checkNotBlank(entrada.text) && entrada.isInput) {
      entrada.isInput = false;
      this.realTimeService.send('/idea/save/', 
                                  WSResponseType.PUSH, 
                                  'entradas',  
                                  entrada, 
                                  {});
        
      var i=0;                 
      for(var en of this.entradas) {
        if(!en.text || en.text.trim().length == 0 || !en.id || en.id == 0)
          this.entradas.splice(i, 1);
        
        i++;
      } 

    //Si la entrada es un texto, se convierte en input
    } else if(!entrada.isInput) {
      entrada.isInput = true;
      if(entrada.text.trim() == 0)
        this.deleteIdea(entrada.id);
        
    }
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


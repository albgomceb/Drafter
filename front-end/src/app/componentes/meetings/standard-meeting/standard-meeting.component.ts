import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RealTimeService, WSResponseType } from '../../../services/real-time.service';
import { Option } from '../../models/option.model';
import { ChatMessage } from '../../../models/chat-message';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'standard-meeting',
  templateUrl: './standard-meeting.component.html',
  styleUrls: ['./standard-meeting.component.scss']
})
export class StandardMeetingComponent implements OnInit {
  
  public agendas: Array<Agenda> = [
    new Agenda(1, "Introduccón", [
      new Conclusion("Ver que hemos hecho"),
      new Conclusion("Ver puntos de la reunión")
    ]),
    new Agenda(2, "Planificar", [
      new Conclusion("Estamos mal planificados")
    ]),
    new Agenda(3, "Conclusiones", [
      new Conclusion("Apurar menos"),
      new Conclusion("Trabajar mas"),
      new Conclusion("Mirar Slack")
    ])
  ];

  public hasEdit: boolean = true;


  constructor(private activeRoute: ActivatedRoute, private realTimeService: RealTimeService) { }

  ngOnInit() {
    this.realTimeService.connect(this.activeRoute.snapshot.params['id'], () => {
      var i = 1;
      for(var cs of this.agendas) {
        this.realTimeService.register('c'+i, cs.conclusions);
        i++;
      }
      this.realTimeService.subscribe();
    })
  }


  edit(event) {
    if(this.hasEdit) {
        var iagenda = event.srcElement.dataset.iagenda;
        var iconclusion = event.srcElement.dataset.iconclusion;
        var content = event.srcElement.textContent.trim();

        // Not send blank
        if(!content || content.length==0 || /^\s*$/.test(content)) {
          this.realTimeService.send('/chat/send/', 
                                  WSResponseType.POP, 
                                  'c'+iagenda,  
                                  {}, 
                                  {index: iconclusion});
        } else {
          this.realTimeService.send('/chat/send/', 
                                  WSResponseType.SET, 
                                  'c'+iagenda,  
                                  new Conclusion(content), 
                                  {index: iconclusion});
        }
    } 
  }

  enter(event) {
    if(event.keyCode == 13) {
      event.srcElement.blur();
      return false;
    }

    return true;
  }

  addConclusion(event) {
    var index = event.srcElement.dataset.index;
    var agenda = this.agendas[index-1];

    // Only one empty
    var i = 0;
    for(var c of agenda.conclusions) {
      if(!c.conclusion || c.conclusion.length==0 || /^\s*$/.test(c.conclusion))
        agenda.conclusions.splice(i, 1);
      i++;
    }

    agenda.conclusions.push(new Conclusion(""));
  }

}

class Agenda {
  constructor(public number: number, public description: string, public conclusions: Array<Conclusion>) { }
}

class Conclusion {
  constructor(public conclusion: string) { }
}
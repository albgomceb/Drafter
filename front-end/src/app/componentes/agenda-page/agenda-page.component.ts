import { Component, OnInit, Renderer2, ViewChild, ElementRef, EventEmitter, Renderer } from '@angular/core';
import { Option } from '../models/option.model';
import { Agenda } from '../models/agenda.model';
import { AgendaService } from '../services/agenda.service'; 
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'agenda-page',
  templateUrl: './agenda-page.component.html',
  styleUrls: ['./agenda-page.component.scss']
})
export class AgendaPageComponent implements OnInit {

  @ViewChild('inp') inp:ElementRef;
  public entradas: Array<Agenda>;
  public counter: number;
  public meetingId: number;
 

  constructor(private agendaService: AgendaService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private renderer2: Renderer2,
    private elementRef: ElementRef,
  private renderer: Renderer ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.meetingId = params['meetingId'];
    });
    this.entradas=[];
    this.entradas.push(new Agenda());
    this.entradas[0].id = 0;
    this.entradas[0].isInput = true;
    this.entradas[0].description = "";
    this.counter = 1;
  }

  saveAgenda(agendas : Agenda[]){
    // Fix temporal para que no mande agendas vacias (que las duplica)
    var temp = new Array<Agenda>();
    for(var a of agendas)
      if(a.description && a.description.trim() != '')
        temp.push(a);

    this.agendaService.saveAgenda(temp, this.meetingId).subscribe(res =>{
      this.router.navigate(["/meeting/"+this.meetingId]);
    });
  }

  addAgenda(){
    var length = this.entradas.length;
    this.entradas.push(new Agenda());
    this.entradas[length].id = this.counter;
    this.counter++;
    this.entradas[length].isInput = true;
    this.entradas[length].description = "";
  } 

  removeAgenda(entrada : Agenda, entradasIndex : number){    
    this.entradas.splice(entradasIndex, 1);
  } 

  convert(entrada : Agenda){
    //Si la actual entrada tiene longitud > 0 y además la entrada es un input, se convierte en texto
    if(this.checkNotBlank(entrada.description) && entrada.isInput)
      entrada.isInput = false;

    //Si la entrada es un texto, se convierte en input
    else if(!entrada.isInput)
      entrada.isInput = true;
  }

  checkNotBlank(string : String) : boolean{
    var res = true;

    if(string.trim().length == 0){
      res = false;
    }

    return res;
  }

  setFocus(event: HTMLElement){
    // let onElement = this.renderer2.getElementById('#'+id);
    // onElement.focus();
    // let elem:HTMLElement = document.getElementById('inp-'+(id+1));
    // elem.focus();
    // console.log(elem);
    let next = new ElementRef(event.nextSibling);

    next.nativeElement.focus();
  }


  
}

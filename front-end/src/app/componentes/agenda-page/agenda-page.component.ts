import { Component, OnInit } from '@angular/core';
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

  public entradas: Array<Agenda>;
  public counter: number;

  constructor(private agendaService: AgendaService, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let meetingId = params['meetingId'];
      console.log(meetingId);
    });
    this.entradas=[];
    this.entradas.push(new Agenda());
    this.entradas[0].id = 0;
    this.entradas[0].isInput = true;
    this.entradas[0].name = "";
    this.counter = 1;
  }

  saveAgenda(agenda : Agenda, id : number){
    this.agendaService.saveAgenda(agenda, id).subscribe(res =>{
    });
  }

  addAgenda(){
    var length = this.entradas.length;
    this.entradas.push(new Agenda());
    this.entradas[length].id = this.counter;
    this.counter++;
    this.entradas[length].isInput = true;
    this.entradas[length].name = "";
  } 

  removeAgenda(entrada : Agenda, entradasIndex : number){    
    this.entradas.splice(entradasIndex, 1);
  } 

  convert(entrada : Agenda){
    //Si la actual entrada tiene longitud > 0 y además la entrada es un input, se convierte en texto
    if(entrada.name.length > 0 && entrada.isInput)
      entrada.isInput = false;

    //Si la entrada es un texto, se convierte en input
    else if(!entrada.isInput)
      entrada.isInput = true;
  }
}

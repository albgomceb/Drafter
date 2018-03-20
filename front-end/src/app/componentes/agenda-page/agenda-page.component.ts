import { Component, OnInit } from '@angular/core';
import { Option } from '../models/option.model';
import { Agenda } from '../models/agenda.model';

@Component({
  selector: 'agenda-page',
  templateUrl: './agenda-page.component.html',
  styleUrls: ['./agenda-page.component.scss']
})
export class AgendaPageComponent implements OnInit {

  public entradas: Array<Agenda>;
  public counter: number;

  constructor() { }

  ngOnInit() {
    this.entradas=[];
    this.entradas.push(new Agenda());
    this.entradas[0].id = 0;
    this.entradas[0].isInput = true;
    this.entradas[0].name = "";
    this.counter = 1;
  }

  addAgenda(){
    var length = this.entradas.length;
    this.entradas.push(new Agenda());
    this.entradas[length].id = this.counter;
    this.counter++;
    this.entradas[length].isInput = true;
    this.entradas[length].name = "";
  } 

  removeAgenda(entrada : Agenda){    
    if(this.entradas.length > 1)
      this.entradas.splice(entrada.id, 1);
  } 

  convert(entrada : Agenda){
    // //Si tenemos más de un punto del día y el seleccionado tiene longitud 0, se borra de entradas
    // if(entrada.isInput && this.entradas.length > 1 && entrada.name.length == 0){
    //   entrada.isInput = false;
    //   this.removeAgenda(entrada);
    // }

    //Si tenemos más de una entrada o la actual no tiene longitud 0 y además la entrada es un input, se convierte en texto
    if(entrada.name.length > 0 && entrada.isInput)
      entrada.isInput = false;

    //Si la entrada es un texto, se convierte en input
    else if(!entrada.isInput)
      entrada.isInput = true;
  }
}
//TODO si le das a remove se borra incluso el primer elemento


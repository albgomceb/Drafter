import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IdeaService } from '../../../services/idea.service';
import { Idea } from '../../../models/idea.model';

@Component({
  selector: 'ideas-create',
  templateUrl: './ideas-create.component.html',
  styleUrls: ['./ideas-create.component.scss']
})

export class IdeasCreateComponent implements OnInit {

  public entradas: Array<Idea>;
  public counter: number;
  public brainId: number;

  constructor(private ideaService: IdeaService, 
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.brainId = params['brainId'];
    });
    this.entradas=[];
    this.entradas.push(new Idea());
    this.entradas[0].id = 0;
    this.entradas[0].isInput = true;
    this.entradas[0].text = "";
    this.counter = 1;
  }

  saveIdea(ideas : Idea[]){
    // Fix temporal para que no mande ideas vacias (que las duplica)
    var temp = new Array<Idea>();
    for(var ide of ideas)
      if(ide.text && ide.text.trim() != '')
        temp.push(ide);

    this.ideaService.saveIdea(temp, this.brainId).subscribe(res =>{
      //To Do: cambiar ruta
      this.router.navigate(["/brainstorming/"+this.brainId]);
    });
  }

  addIdea(){
    var length = this.entradas.length;
    this.entradas.push(new Idea());
    this.entradas[length].id = this.counter;
    this.counter++;
    this.entradas[length].isInput = true;
    this.entradas[length].text = "";
  } 

  removeIdea(entrada : Idea, entradasIndex : number){    
    this.entradas.splice(entradasIndex, 1);
  } 

  convert(entrada : Idea){
    //Si la actual entrada tiene longitud > 0 y además la entrada es un input, se convierte en texto
    if(this.checkNotBlank(entrada.text) && entrada.isInput)
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
}


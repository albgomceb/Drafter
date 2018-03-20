import { NgModule, Component, OnInit } from '@angular/core';
import { ParticipantService } from '../services/participant.service';
import { Participant } from '../models/participant.model';
import { HttpErrorResponse } from '@angular/common/http';

import { ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder } from '@angular/forms';

@Component({
  selector: 'participants-page',
  templateUrl: './participants-page.component.html',
  styleUrls: ['./participants-page.component.scss']
})
export class ParticipantsPageComponent implements OnInit {

  hideme=[]

  participants: Array<Participant>;
  attendants: Array<string>;

  errorListParticipants:boolean = false;

  meetingForm: FormGroup;

  constructor(private participantService: ParticipantService) {

  }

  ngOnInit() {

    this.meetingForm = new FormGroup({title: new FormControl(),description: new FormControl()});
    this.attendants = new Array<string>();

    this.participantService.getParticipants().subscribe(
      data => 
      {
        this.participants = data;
      },
      error => {
        this.errorListParticipants = true;
      }
    );

  } 

  addAttendant(id:string){
    this.attendants.push(id);
  }

  onSubmit(meetingForm){
      let meeting = new Meeting(meetingForm.value.title,meetingForm.value.description,this.attendants);
      console.log(meeting);
      //AQUI SE TIENE QUE LLAMAR AL METODO POST
      this.meetingForm.reset();
  }


  

}

class Meeting {
  constructor(public title: string,public description: string,public attendants: Array<string>){}
}

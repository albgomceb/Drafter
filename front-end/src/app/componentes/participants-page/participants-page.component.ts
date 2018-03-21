import { NgModule, Component, OnInit } from '@angular/core';
import { ParticipantService } from '../services/participant.service';
import { Participant } from '../models/participant.model';
import { HttpErrorResponse } from '@angular/common/http';

import { Meeting } from '../models/meeting.model';

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

  meeting: Meeting;

  constructor(private participantService: ParticipantService) {}

  ngOnInit() {

    this.meeting = new Meeting();

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

  onSubmit(meeting){
      this.meeting.setAttendants(this.attendants);
      this.participantService.saveMeeting(meeting).subscribe(res =>{});
      console.log(meeting)
  }


}

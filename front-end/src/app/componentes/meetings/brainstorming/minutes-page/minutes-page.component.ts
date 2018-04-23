import { element } from 'protractor';
import { Component, OnInit, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import { MeetingService } from '../../../services/meeting.service';
import { ActivatedRoute } from '@angular/router';
import { Idea } from '../../../models/idea.model';
import { Pros } from '../../../models/pros.model';
import { Cons } from '../../../models/cons.model';
import { Meeting } from '../../../models/meeting.model';
import { BrainStormingService } from '../../../services/brainstorming.service';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'brainstorming-minutes-page',
  templateUrl: './minutes-page.component.html',
  styleUrls: ['./minutes-page.component.scss']
})
export class BrainStormingMinutesPageComponent implements OnInit {

  meeting: Meeting = new Meeting();
  ideas: Array<Idea> = [];
  @Input() meetingId: number;
  @Input() meetingInfo: any;
  @ViewChild('content') content: ElementRef

  constructor(private meetingService: MeetingService,
    private brainstormingService: BrainStormingService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.meetingService.getMeeting(this.meetingId).subscribe(data => {
      this.meeting = data;
      this.brainstormingService.getIdeas(this.meetingId).subscribe(data => {
        this.ideas = data;
      });
    });
  };

  getAverage(idea: Idea) {
    return Math.round((idea.votes.map((vote) => vote.value).reduce((v1, v2) => v1 + v2) / idea.votes.length) * 100) / 100;
  }

  downloadPDF() {

    let doc = new jsPDF();

    let specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    }
    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15,
      {
        'width': 100,
        'elementHandlers': specialElementHandlers
      },function(){doc.save('MeetingPDF');});

      
  }
}

import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { element } from 'protractor';
import { Component, OnInit, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import { MeetingService } from '../../../services/meeting.service';
import { ActivatedRoute } from '@angular/router';
import { Idea } from '../../../models/idea.model';
import { Pros } from '../../../models/pros.model';
import { Cons } from '../../../models/cons.model';
import { Meeting } from '../../../models/meeting.model';
import { BrainStormingService } from '../../../services/brainstorming.service';
import { Option } from '../../../models/option.model';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas'


@Component({
  selector: 'brainstorming-minutes-page',
  templateUrl: './minutes-page.component.html',
  styleUrls: ['./minutes-page.component.scss']
})
export class BrainStormingMinutesPageComponent implements OnInit {

  meeting: Meeting = new Meeting();
  ideas: Array<Idea> = [];
  leader: Option;
  attendants: Array<Option>;
  @Input() meetingId: number;
  @Input() meetingInfo: any;
  @ViewChild('content') content: ElementRef

  constructor(private meetingService: MeetingService,
    private brainstormingService: BrainStormingService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    //OBTENER SESSION LEADER
    this.attendants = this.meetingInfo.attendants;
    this.attendants.forEach(at => {
      if (at.role == "LEADER") { this.leader = at; }
    });

    this.meetingService.getMeeting(this.meetingId).subscribe(data => {
      this.meeting = data;
      if (!this.meeting.hasFinished) {
        this.router.navigateByUrl('/meeting/' + this.meetingId);
      }
      this.brainstormingService.getSortedIdeas(this.meetingId).subscribe(data => {
        this.ideas = data;
      });
    });
  };

  getAverage(idea: Idea) {
    return Math.round((idea.votes.map((vote) => vote.value).reduce((v1, v2) => v1 + v2) / idea.votes.length) * 100) / 100;
  }

  downloadPDF() {


    let content = this.content.nativeElement;

    html2canvas(content, { useCORS: true, letterRendering:true}).then(function (canvas) {
      var imgWidth = 190;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      var img = canvas.toDataURL();

      var doc = new jsPDF('p','mm');
      var position = 0;

      doc.addImage(img, 'JPEG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(img, 'JPEG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save('Minutes.pdf');
    });
  }
downloadDoc(){
    var html = document.getElementById('content').outerHTML;
    var blob = new Blob(['\ufeff', html], {
      type: 'application/msword'
    });
    var href = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = href;
    a.download = "documento.doc";
    document.body.appendChild(a);
    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, 'documento.doc');
    } else {
      a.click();
    }
    document.body.removeChild(a);
  }

  public format(): string {
    var s: number = this.meeting.timer;
    var m: number = Math.floor(this.meeting.timer / 60);
    var h: number = Math.floor(m / 60);

    m -= 60 * h;
    s -= 3600 * h + 60 * m;

    var sm: string = ("00" + m).slice(-2);
    var ss: string = ("00" + s).slice(-2);

    return "" + h + ":" + sm + ":" + ss;
  }
}
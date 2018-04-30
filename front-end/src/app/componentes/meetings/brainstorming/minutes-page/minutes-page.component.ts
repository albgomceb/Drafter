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
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas'
import { Option } from '../../../models/option.model';

@Component({
  selector: 'brainstorming-minutes-page',
  templateUrl: './minutes-page.component.html',
  styleUrls: ['./minutes-page.component.scss']
})
export class BrainStormingMinutesPageComponent implements OnInit {

  meeting: Meeting = new Meeting();
  ideas: Array<Idea> = [];
  leader:Option;
  attendants:Array<Option>;
  @Input() meetingId: number;
  @Input() meetingInfo: any;
  @ViewChild('content') content: ElementRef

  constructor(private meetingService: MeetingService,
    private brainstormingService: BrainStormingService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    //OBTENER SESSION LEADER
    this.attendants = this.meetingInfo.attendants;
    this.attendants.forEach(at => {
      if(at.role=="LEADER"){this.leader = at;} 
    });
    
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


    let content = this.content.nativeElement;

    /*var canvasToImage = function (canvas) {
      var img = new Image();
      var dataURL = canvas.toDataURL('image/png');
      img.src = dataURL;
      return img;
    };
    var canvasShiftImage = function (oldCanvas, shiftAmt) {
      shiftAmt = parseInt(shiftAmt) || 0;
      if (!shiftAmt) { return oldCanvas; }

      var newCanvas = document.createElement('canvas');
      newCanvas.height = oldCanvas.height - shiftAmt;
      newCanvas.width = oldCanvas.width;
      var ctx = newCanvas.getContext('2d');

      var img = canvasToImage(oldCanvas);
      ctx.drawImage(img, 0, shiftAmt, img.width, img.height, 0, 0, img.width, img.height);

      return newCanvas;
    };

    html2canvas(content).then(function (canvas) {
      var pdf = new jsPDF('l', 'px'),
        pdfInternals = pdf.internal,
        pdfPageSize = pdfInternals.pageSize,
        pdfScaleFactor = pdfInternals.scaleFactor,
        pdfPageWidth = pdfPageSize.width,
        pdfPageHeight = pdfPageSize.height,
        totalPdfHeight = 0,
        htmlPageHeight = canvas.height,
        htmlScaleFactor = canvas.width / (pdfPageWidth * pdfScaleFactor),
        safetyNet = 0;

      while (totalPdfHeight < htmlPageHeight && safetyNet < 15) {
        var newCanvas = canvasShiftImage(canvas, totalPdfHeight);
        pdf.addImage(newCanvas, 'png', 0, 0, pdfPageWidth, 0, null, 'NONE');

        totalPdfHeight += (pdfPageHeight * pdfScaleFactor * htmlScaleFactor);

        if (totalPdfHeight < htmlPageHeight) {
          pdf.addPage();
        }
        safetyNet++;
      }

      pdf.save('test.pdf');
*/
    html2canvas(content,{useCORS:true}).then(function (canvas) {

      var img = canvas.toDataURL();
      var doc = new jsPDF();
      doc.addImage(img, 'PNG',10,10,190,250);
      doc.save('Minutes.pdf');
    });
  }

  public format(): string {
    var s: number = this.meeting.timer;
    var m: number = Math.floor(this.meeting.timer/60);
    var h: number = Math.floor(m/60);

    m -= 60*h;
    s -= 3600*h + 60*m;

    var sm: string = ("00" + m).slice(-2);
    var ss: string = ("00" + s).slice(-2);

    return "" + h + ":" + sm + ":" + ss;
  }
}
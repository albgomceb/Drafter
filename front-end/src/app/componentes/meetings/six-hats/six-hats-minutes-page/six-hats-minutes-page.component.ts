import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { SixHats } from '../../../models/sixHats.model';
import { Meeting } from '../../../models/meeting.model';
import { MeetingService } from '../../../services/meeting.service';
import { SixHatsService } from '../../../services/sixhats.service';
import { ActivatedRoute } from '@angular/router';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas'

@Component({
  selector: 'six-hats-minutes-page',
  templateUrl: './six-hats-minutes-page.component.html',
  styleUrls: ['./six-hats-minutes-page.component.scss']
})
export class SixHatsMinutesPageComponent implements OnInit {

  meeting: Meeting = new Meeting();
  sixHats: SixHats = new SixHats();
  @ViewChild('content') content: ElementRef
  @Input() 
  public meetingId: number;
  @Input() 
  public meetingInfo: any;
  

  constructor(private meetingService: MeetingService, 
    private sixHatsService: SixHatsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
    this.meetingService.getMeeting(this.meetingId).subscribe(data => {
      this.meeting = data;
      this.sixHatsService.getSixHatsByMeeting(this.meetingId).subscribe(data => {
        this.sixHats = data;
      });
    });
  };
  
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
}
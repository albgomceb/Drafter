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

    html2canvas(content, { useCORS: true }).then(function (canvas) {
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      var img = canvas.toDataURL();

      var doc = new jsPDF('p', 'mm');
      var position = 0;

      doc.addImage(img, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(img, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save('Minutes.pdf');
    });
  }
}
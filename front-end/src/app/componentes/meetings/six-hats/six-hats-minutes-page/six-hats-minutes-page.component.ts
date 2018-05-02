import { Router } from '@angular/router';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { SixHats } from '../../../models/sixHats.model';
import { Meeting } from '../../../models/meeting.model';
import { MeetingService } from '../../../services/meeting.service';
import { SixHatsService } from '../../../services/sixhats.service';
import { ActivatedRoute } from '@angular/router';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas'
import { Participant } from '../../../models/participant.model';
import { Option } from '../../../models/option.model';

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

  private leader : Option;
  

  constructor(private meetingService: MeetingService, 
    private sixHatsService: SixHatsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    
    this.meetingService.getMeeting(this.meetingId).subscribe(data => {
      this.meeting = data;
      
      if (!this.meeting.hasFinished) {
        this.router.navigateByUrl('/meeting/' + this.meetingId);
      }
      this.sixHatsService.getSixHatsByMeeting(this.meetingId).subscribe(data => {
        this.sixHats = data;
        this.meetingService.getLeader(this.meetingId).subscribe(leader => 
          this.leader = leader);
      });
    });
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
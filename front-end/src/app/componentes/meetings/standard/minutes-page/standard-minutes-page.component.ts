import { Meeting } from './../../../models/meeting.model';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Agenda2 } from '../../../models/agenda.model2';
import { Conclusion } from '../../../../models/conclusion';
import { MeetingService } from '../../../services/meeting.service';
import { Option } from '../../../models/option.model';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas'

@Component({
  selector: 'standard-minutes-page',
  templateUrl: './standard-minutes-page.component.html',
  styleUrls: ['./standard-minutes-page.component.scss']
})
export class StandardMinutesPageComponent implements OnInit {

  meeting: Meeting = new Meeting();
  leader: Option;
  attendants: Array<Option>;
  model: any[];
  agendas: Array<Agenda2>;
  conclusions: Array<Conclusion> = [];
  @ViewChild('content') content: ElementRef
  @Input() meetingId: number;
  @Input() meetingInfo: any;


  constructor(private meetingService: MeetingService,
    private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //OBTENER SESSION LEADER
    this.attendants = this.meetingInfo.attendants;
    this.attendants.forEach(at => {
      if (at.role == "LEADER")
        this.leader = at;
    });

    this.meetingService.getMeeting(this.meetingId).subscribe(data => {
      this.meeting = data;
      if (!this.meeting.hasFinished) {
        this.router.navigateByUrl('/meeting/' + this.meetingId);
      }
    });

    this.meetingService.getAgendas(this.meetingId).subscribe(data => {
      this.agendas = data;
      this.model = [];
      for (let ag of this.agendas) {
        var val = {
          agenda: ag,
          conclusion: ag
        }

        this.model.push(val);
      }
    });
  };

  downloadPDF() {


    let content = this.content.nativeElement;

    html2canvas(content, { useCORS: true }).then(function (canvas) {
      var imgWidth = 190;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      var img = canvas.toDataURL();

      var doc = new jsPDF('p', 'mm');
      var position = 0;

      doc.addImage(img, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(img, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save('Minutes.pdf');
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
}

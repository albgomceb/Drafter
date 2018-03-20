import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { RealTimeService, WSResponseType } from '../../../services/real-time.service';
import { Option } from '../../models/option.model';
import { ChatMessage } from '../../../models/chat-message';

@Component({
  selector: 'standard-meeting',
  templateUrl: './standard-meeting.component.html',
  styleUrls: ['./standard-meeting.component.scss']
})
export class StandardMeetingComponent implements OnInit {
  public conclusions: Array<any>;
  @ViewChild('editable') editable: ElementRef;
  constructor(private router:Router,private realTimeService: RealTimeService) { }

  ngOnInit() {
  
    this.realTimeService.connect(20, frame => {
      this.realTimeService.subscribe('/conclussion/',this.conclusions, obj => {
        obj.model.user = obj.data.user;
      });
    })
  }

  onSubmit() {
    var val = this.editable.nativeElement.innerHTML;
    this.editable.nativeElement.innerHTML = '';

    // Not send blank
    if(!val || val.length==0 || /^\s*$/.test(val))
      return;

    var model = new ChatMessage(val, this.realTimeService.getUser(), "");
    this.realTimeService.send('/conslussion/send/', WSResponseType.PUSH, model);
  }
  lineBreak(event) {
    if(event.keyCode == 13) {
      this.onSubmit();
      return false;
    }
  }

  fakeConlusions(){
    return [
    {
      id: '1',
      name: 'conclusion 1'
    },
    {
      id: '2',
      name: 'conclusion 2'
    },
    {
      id: '2',
      name: 'conclusion 2'
    }
  ];
  }

}

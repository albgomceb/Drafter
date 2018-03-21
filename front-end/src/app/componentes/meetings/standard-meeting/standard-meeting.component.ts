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


  constructor(private router:Router,private realTimeService: RealTimeService) { }

  ngOnInit() {
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

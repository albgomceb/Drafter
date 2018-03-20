import { RealTimeService, WSResponseType } from './../../services/real-time.service';
import { ChatMessage } from './../../models/chat-message';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @ViewChild('editable') editable: ElementRef;
  messages: Array<ChatMessage>;


  constructor(private realTimeService: RealTimeService) { }


  ngOnInit() {
    this.messages = new Array<ChatMessage>();
    this.realTimeService.connect(20, frame => {
      this.realTimeService.subscribe(this.messages, obj => {
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
    this.realTimeService.send('/chat/send/', WSResponseType.PUSH, model);
  }

  lineBreak(event) {
    console.log(event)
    if(event.keyCode == 13) {
      this.onSubmit();
      return false;
    }
  }

}

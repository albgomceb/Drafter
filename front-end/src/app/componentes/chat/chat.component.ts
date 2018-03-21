import { RealTimeService, WSResponseType } from './../../services/real-time.service';
import { ChatMessage } from './../../models/chat-message';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @ViewChild('editable') editable: ElementRef;
  messages: Array<ChatMessage>;


  constructor(private realTimeService: RealTimeService, private activeRoute: ActivatedRoute) { }


  ngOnInit() {
    this.messages = new Array<ChatMessage>();
    this.realTimeService.connect(this.activeRoute.snapshot.params['id'], frame => {
      this.realTimeService.register('messages', this.messages, obj => {
        var date = new Date();
        var min = "0" + date.getMinutes();
        min = min.substring(min.length-2, min.length);
        obj.model.time = date.getHours() + ":" + min;
      });
      this.realTimeService.subscribe();
    });
  }

  onSubmit() {
    var val = this.editable.nativeElement.textContent.trim();
    this.editable.nativeElement.textContent = '';

    // Not send blank
    if(!val || val.length==0 || /^\s*$/.test(val))
      return;

    var model = new ChatMessage(val, this.realTimeService.getUserUUID(), "");
    this.realTimeService.send('/chat/send/', WSResponseType.PUSH, 'messages',  model);
  }

  lineBreak(event) {
    if(event.keyCode == 13) {
      this.onSubmit();
      return false;
    }
  }

  foco() {
    this.editable.nativeElement.focus();
  }

  public getUserColor(uuid: string): string {
    return this.realTimeService.getUserColor(uuid);
  }

  public getUser(uuid: string): string {
    return this.realTimeService.getUser(uuid);
  }

}

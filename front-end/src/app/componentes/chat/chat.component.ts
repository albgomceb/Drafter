import { window } from 'rxjs/operators/window';
import { RealTimeService, WSResponseType } from './../../services/real-time.service';
import { ChatMessage } from './../../models/chat-message';
import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { setInterval, clearInterval } from 'timers';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<number>();
  @ViewChild('editable') editable: ElementRef;
  @ViewChild('messagesRef') messagesRef: ElementRef;
  messages: Array<ChatMessage>;

  lastReadedMsg: number;

  constructor(private realTimeService: RealTimeService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.messages = new Array<ChatMessage>();
    this.lastReadedMsg = 0;
    this.realTimeService.connect(this.activeRoute.snapshot.params['id'], frame => {
      this.realTimeService.register('messages', this.messages, obj => {
        var date = new Date();
        var min = "0" + date.getMinutes();
        min = min.substring(min.length-2, min.length);
        obj.model.time = date.getHours() + ":" + min;

        this.realTimeService.getUserUUID()==obj.data.userUUID ? this.readMsg() : this.updateLastReaded();
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

  scroll(event) {
    if(event.target.scrollTop == (event.target.scrollHeight - event.target.clientHeight))
      this.readMsg();
  }

  public getUserColor(uuid: string): string {
    return this.realTimeService.getUserColor(uuid);
  }

  public getUser(uuid: string): string {
    return this.realTimeService.getUser(uuid);
  }

  public isPrincipal(uuid: string): boolean {
    return this.realTimeService.getUserUUID() == uuid;
  }

  public getUnreadedMsg(): number {
    var res = this.messages.length - this.lastReadedMsg;
    return res != 0 ? res : undefined;
  }

  public hasUnreadedMsg(): boolean {
    var res = this.getUnreadedMsg();
    return res != undefined && res > 0;
  }

  public hasScrollBar(): boolean {
    var elem = this.messagesRef.nativeElement;
    return elem.scrollHeight > elem.clientHeight;
  }

  public updateLastReaded() {
    this.messageEvent.emit(this.getUnreadedMsg());
  }

  public readMsg() {
    setTimeout(() => {
      var elem = this.messagesRef.nativeElement;
      elem.scrollTo(0, elem.scrollHeight - elem.clientHeight);

      this.lastReadedMsg = this.messages.length;
      this.updateLastReaded();
    }, 0);  // Con esto se consegue que se ejecute despues de actualizar la vista
  }

  public showNotReaded(index: number): boolean {
    return index == this.lastReadedMsg && this.lastReadedMsg != this.messages.length && index != 0;
  }

}

import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from '../../environments/environment';

@Injectable()
export class RealTimeService {

  private stompClient;
  private meeting: number;
  private models: Array<Object>;
  private user: string;


  constructor() { }

  public getUser(): string {
    return this.user;
  }
  public setUser(user:string){
    this.user = user;
  }


  public connect(meeting: number, callback: Function = null) {
    this.meeting = meeting;
    this.user= this.user?this.user:'Unnamed'; 
    var ws = new SockJS(environment.baseWS);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, frame => {
      
      if(callback)
        callback(frame);
    });
  }

  public subscribe(url:string,model: Array<any>, callback: Function = null) {
    var that = this;
    that.stompClient.subscribe(url + this.meeting, (msg) => {
      if(msg.body) {
        var obj: Model = JSON.parse(msg.body);

        switch(obj.type) {
          case "push":
            model.push(obj.model);
            break;

          case "pop":
            model.pop();
            break;
            
          case "revert":
            break;
          
          case "set":
            model.splice(0, model.length);
            model.push(obj.model);
            break;
            
          case "unset":
            model.splice(0, model.length);
            break;
        }

        if(callback)
          callback(obj);
      }
    });
  }

  public send(uri: string, type: WSResponseType, model: any, data: any = null) {
    if(!data)
      data = {};

    data.user = this.user;

    var a = new Model(type, model, data);
    var json = JSON.stringify(a);
    this.stompClient.send('/app' + uri + this.meeting, {}, json);
  }

}

export enum WSResponseType {
    PUSH = 'push',
    POP = 'pop',
    REVERT = 'revert',
    SET = 'set',
    UNSET = 'unset'
}

export class Model {
  constructor(public type: string, public model: any, public data: Object) { }
}
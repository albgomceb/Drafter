import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from '../../environments/environment';
import { send } from 'q';

@Injectable()
export class RealTimeService {

  private stompClient;
  private meeting: number;
  private user: string;
  private models: Array<any>;
  private callbacks: Array<Function>;
  private userUUID: string;
  private users: { [key:string]:any; };
  private usersCount: number;
  private subscribed: boolean = false;


  constructor() { }

  public getUserUUID(): string {
    return this.userUUID;
  }

  public getUser(uuid: string): string {
    return this.users[''+uuid].name;
  }

  public getUserColor(uuid: string): string {
    return this.users[''+uuid].color;
  }

  public getMeeting(): number {
    return this.meeting;
  }


  public connect(meeting: number, callback: Function) {
    if(!this.callbacks)
      this.callbacks = new Array<Function>();
    this.callbacks.push(callback);

    if(this.stompClient) 
      return;

    this.userUUID = ''+Math.ceil(Math.random()*0xFFFFFFFF);
    this.users = {};
    this.usersCount = 0;
    this.meeting = meeting;
    this.user= this.user ? this.user : 'Unnamed';
    this.models = new Array<any>();

    var ws = new SockJS(environment.baseWS);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, frame => {
      // Callbacks
      for(var c of this.callbacks)
        c();

      // Request users
      this.send('/chat/send/', WSResponseType.REQUEST_USERS, "", null, {});
    });
  }

  public register(name: string, model: Array<any>, callback: Function = null) {
    this.models[name] = {model: model, callback: callback};
  }

  public subscribe() {
    if(this.subscribed)
      return;

    this.subscribed = true;
    this.stompClient.subscribe("/meeting/" + this.meeting, (msg) => {
      if(msg.body) {
        var model: any;
        var callback: Function;
        var obj = JSON.parse(msg.body);

        if(obj.data.noself) {
          if(obj.data.userUUID == this.userUUID)
            return;
        }

        if(obj.type.charAt(0) != '*') {
          model = this.models[obj.name].model;
          callback = this.models[obj.name].callback;
        }

        switch(obj.type) {
          case WSResponseType.PUSH:
            model.push(obj.model);
            break;

          case WSResponseType.POP:
            if(obj.data['id']) {
              var i = 0;
              for(var o of model) {
                if(o.id && o.id==obj.data['id']) {
                  model.splice(i, 1);
                  break;
                }
                
                i++;
              }

              break;
            }

            if(!obj.data['index'] || obj.data['index'] < 0)
              model.pop();
            else
              model.splice(obj.data['index'], obj.data['last'] ? obj.data['last'] : 1);
            break;
            
          case WSResponseType.REVERT:
            break;
          
          case WSResponseType.SET:
            var data = obj.data['index'] ? obj.data['index'] : 0;
            model[data] = obj.model
            break;
            
          case WSResponseType.UNSET:
            model.splice(0, model.length);
            break;

          case WSResponseType.REQUEST_USERS:
            this.send('/chat/send/', WSResponseType.RESPONSE_USERS, "", null, {});
            this.addUser(obj.data['userUUID'], obj.data['user']);
            break;

          case WSResponseType.RESPONSE_USERS:
            this.addUser(obj.data['userUUID'], obj.data['user']);
            break;
        }
        
        if(callback)
          callback(obj);
      }
    });
  }

  private addUser(userUUID: string, user: string) {
    if(this.users[userUUID])
      return;

    this.users[userUUID] = {name: user, color: "hsl(" + this.usersCount*47%360 + ", 100%, 40%)"};
    this.usersCount = this.usersCount+1;
  }

  public send(uri: string, type: WSResponseType, name: string, model: any, data: any = null) {
    if(!data)
      data = {};

    data.user = this.user;
    data.userUUID = this.userUUID;

    var a = new Model(type, name, model, data);
    var json = JSON.stringify(a);
    this.stompClient.send('/app' + uri + this.meeting, {}, json);
  }

}

export enum WSResponseType {
    PUSH = 'push',
    POP = 'pop',
    REVERT = 'revert',
    SET = 'set',
    UNSET = 'unset',

    REQUEST_USERS = '*request_users',
    RESPONSE_USERS = '*reponse_users'
}

export class Model {
  constructor(public type: string, public name: string, public model: any, public data: Object) { }
}
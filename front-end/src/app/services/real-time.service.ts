import { UserService } from './../componentes/services/user.service';
import { User } from './../componentes/models/user.model';
import { LoginService } from './../componentes/services/login.service';
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
  private users: { [key: string]: any; };
  private usersCount: number;
  private subscribed: boolean = false;
  private timeout;


  constructor(private loginService: LoginService) { }


  public getUserUUID(): string {
    return this.userUUID;
  }

  public getUser(uuid: string): string {
    return this.users['' + uuid].name;
  }

  public getUserColor(uuid: string): string {
    return this.users['' + uuid].color;
  }

  public getMeeting(): number {
    return this.meeting;
  }


  private heartbeat() {
    var that = this;
    this.timeout = setInterval(function () {
      that.send('/chat/send/', WSResponseType.HEARTBEAT, '', {}, {});
    }, 30000);
  }

  public connect(meeting: number, callback: Function) {
    if (!this.callbacks)
      this.callbacks = new Array<Function>();
    this.callbacks.push(callback);

    if (this.stompClient) {
      for (var c of this.callbacks)
        c();

      return;
    }

    this.userUUID = '' + Math.ceil(Math.random() * 0xFFFFFFFF);
    this.users = {};
    this.usersCount = 0;
    this.meeting = meeting;
    this.user = this.loginService.getPrincipal().username;
    this.models = new Array<any>();

    var ws = new SockJS(environment.baseWS);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, frame => {
      // Heartbeat
      this.heartbeat();

      // Callbacks
      for (var c of this.callbacks)
        c();

      // Request users
      this.send('/chat/send/', WSResponseType.REQUEST_USERS, "", null, {});
    });
  }

  public disconnect() {
    this.stompClient.disconnect(() => {
      alert('')
      this.models = new Array<any>();
      this.callbacks = new Array<Function>();
      this.users = {};
      this.usersCount = 0;
      this.subscribed = false;
      this.stompClient = undefined;
      
      clearInterval(this.timeout);
      this.timeout = undefined;
    });
  }

  public register(name: string, model: Array<any>, callback: Function = null) {
    this.models[name] = { model: model, callback: callback };
  }

  public unregister(name: string) {
    this.models[name] = undefined;
  }

  public subscribe() {
    if (this.subscribed)
      return;

    this.subscribed = true;
    this.stompClient.subscribe("/meeting/" + this.meeting, (msg) => {
      if (msg.body) {
        var model: any;
        var callback: Function;
        var obj = JSON.parse(msg.body);

        if (obj.data.noself) {
          if (obj.data.userUUID == this.userUUID)
            return;
        }

        if (obj.type.charAt(0) != '*') {
          model = this.models[obj.name].model;
          callback = this.models[obj.name].callback;
        }

        switch (obj.type) {
          case WSResponseType.HEARTBEAT:
            clearInterval(this.timeout);
            this.heartbeat();
            break;

          case WSResponseType.PUSH:
            if (obj.data['id'] && obj.data['id'] != 0) {
              var i = 0;
              for (var o of model) {
                if (o.id && o.id == obj.data['id']) {
                  model[i] = obj.model;
                  break;
                }

                i++;
              }

              break;
            } else if (obj.data['isnew']) {
              var i = 0;
              for (var o of model) {
                console.log(i);
                if (!o.id || o.id == 0) {
                  console.log(i);
                  model[i] = obj.model;
                  break;
                }

                i++;
              }

              break;
            }

            model.push(obj.model);
            break;

          case WSResponseType.POP:
            if (obj.data['id']) {
              var i = 0;
              for (var o of model) {
                if (o.id && o.id == obj.data['id']) {
                  model.splice(i, 1);
                  break;
                }

                i++;
              }

              break;
            }

            if (!obj.data['index'] || obj.data['index'] < 0)
              model.pop();
            else
              model.splice(obj.data['index'], obj.data['last'] ? obj.data['last'] : 1);
            break;

          case WSResponseType.REVERT:
            break;

          case WSResponseType.SET:
            var data = obj.data['index'] ? obj.data['index'] : 0;
            model[data] = obj.model;
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

        if (callback)
          callback(obj);
      }
    });
  }

  private addUser(userUUID: string, user: string) {
    if (this.users[userUUID])
      return;

    this.users[userUUID] = { name: user, color: "hsl(" + this.usersCount * 47 % 360 + ", 100%, 40%)" };
    this.usersCount = this.usersCount + 1;
  }

  public send(uri: string, type: WSResponseType, name: string, model: any, data: any = null) {
    if (!data)
      data = {};

    data.user = this.user;
    data.userUUID = this.userUUID;

    if(data.id != undefined && data.id == 0)
      data.isnew = true;

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
  RESPONSE_USERS = '*reponse_users',

  HEARTBEAT = '*heartbeat',

  RUN = 'run'
}

export class Model {
  constructor(public type: string, public name: string, public model: any, public data: Object) { }
}
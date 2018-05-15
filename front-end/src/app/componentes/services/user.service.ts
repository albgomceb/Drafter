import { Participant } from './../models/participant.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Meeting } from '../models/meeting.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  staticUrl: String = environment.baseApi;


  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.staticUrl + '/users');
  }

  filterUsers(keyword: string): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.staticUrl + '/users/filterUsers?search=' + keyword)
  }

  filterUsers2(keyword: string): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.staticUrl + '/users/filterUsers2?search=' + keyword)
  }

  saveMeeting(meeting: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>(this.staticUrl + '/meeting/standard/', meeting, {});
  }

  getParticipant(meetingId: number): Observable<Participant> {

    return this.http.get<Participant>(this.staticUrl + '/participants/' + meetingId, {});
  }

  saveParticipant(participant:Participant): Observable<Participant> {

    return this.http.post<Participant>(this.staticUrl + '/participants/',participant, {});
  }
  
  getLoginUser(): Observable<User> {
    return this.http.get<User>(this.staticUrl + '/users/me/');
  }

  hasPay(): Observable<any> {
    return this.http.get<User>(this.staticUrl + '/users/hasPay');
  }

  pay(): Observable<any> {
    return this.http.get<User>(this.staticUrl + '/users/pay');
  }

}
import {Injectable} from '@angular/core';
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

  constructor(private http:HttpClient) {}

  staticUrl:String = environment.baseApi;


  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.staticUrl+'/users');
  }

  saveMeeting(meeting: Meeting): Observable<Meeting>{
    return this.http.post<Meeting>(this.staticUrl+'/meeting/standard/', meeting, {});
  }

}

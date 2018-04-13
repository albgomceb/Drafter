import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Agenda } from '../models/agenda.model';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Idea } from '../models/idea.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BrainStormingService {

  constructor(private http:HttpClient) {}

  staticUrl:String = environment.baseApi;


  getIdeas(meetingId): Observable<Array<Idea>> {
    return this.http.get<Array<Idea>>(this.staticUrl+'/minutes/meeting/'+meetingId+'/ideas');
  }
}

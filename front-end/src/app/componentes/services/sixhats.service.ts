import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Agenda } from '../models/agenda.model';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { SixHats } from '../models/sixHats.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SixHatsService {

  constructor(private http:HttpClient) {}

  staticUrl:String = environment.baseApi;

  getSixHatsByMeeting(meeting: number): Observable<SixHats> {
    return this.http.get<SixHats>(this.staticUrl+'/sixHats/' + meeting);
  }

  saveSixHats(sixHats:SixHats, id:number): Observable<SixHats> {
    return this.http.post<SixHats>(this.staticUrl+'/sixHats/'+id,sixHats,{});
  }
}

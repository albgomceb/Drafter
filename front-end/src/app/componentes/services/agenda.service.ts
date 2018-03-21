import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Agenda } from '../models/agenda.model';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AgendaService {

  constructor(private http:HttpClient) {}

  staticUrl:String = environment.baseApi;


  getAgendas(): Observable<Array<Agenda>> {
    return this.http.get<Array<Agenda>>(this.staticUrl+'/agendas');
  }

  saveAgenda(agenda:Agenda): Observable<Agenda> {
    return this.http.post<Agenda>(this.staticUrl+'/agendas/',agenda,{});
  }
}

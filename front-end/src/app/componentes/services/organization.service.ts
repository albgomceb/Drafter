import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Organization } from '../models/organization.model';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Department } from '../models/department.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class OrganizationService {

    constructor(private http:HttpClient) {}

    staticUrl:String = environment.baseApi;

    getOrganization(): Observable<Organization> {
        return this.http.get<Organization>(this.staticUrl+'/organization');
    }
    
    getOrganizationsByUser(user: number): Observable<Array<Organization>> {
        return this.http.get<Array<Organization>>(this.staticUrl+'/organization/list/' + user);
    }

    getOrganizations(): Observable<Array<Organization>> {
        return this.http.get<Array<Organization>>(this.staticUrl+'/organization/list');
    }
    
    saveOrganization(organization:Organization, id:number): Observable<Organization> {
        return this.http.post<Organization>(this.staticUrl+'/organization/'+id,organization,{});
    }
}
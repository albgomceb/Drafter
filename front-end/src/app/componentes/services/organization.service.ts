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
    
    getOrganization(organizationId: number): Observable<Organization> {
        return this.http.get<Organization>(this.staticUrl+'/organization/' + organizationId);
    }

    getOrganizationsByUser(userId: number): Observable<Array<Organization>> {
        return this.http.get<Array<Organization>>(this.staticUrl+'/organization/list/' + userId);
    }
    
    saveOrganization(organization:Organization, id:number): Observable<Organization> {
        return this.http.post<Organization>(this.staticUrl+'/organization/' + id,organization, {});
    }

    editOrganization(organization:Organization): Observable<Organization> {
        return this.http.put<Organization>(this.staticUrl+'/organization/' + organization.id, {});
    }
}
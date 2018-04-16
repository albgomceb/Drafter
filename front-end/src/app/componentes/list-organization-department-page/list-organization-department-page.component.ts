import { Component, OnInit } from '@angular/core';
import { Organization } from '../models/organization.model';
import { OrganizationService } from '../services/organization.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'list-organization-department-page',
  templateUrl: './list-organization-department-page.component.html',
  styleUrls: ['./list-organization-department-page.component.scss']
})
export class ListOrganizationDepartmentPageComponent implements OnInit {

  show=[]

  private organizations: Array<Organization>;
  public userId: number;

  errorListUsers:boolean = false;

  constructor(private organizationService: OrganizationService, 
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['userId'];
    });
    this.organizations = [];

    // Cogemos las organizaciones del usuario
    this.organizationService.getOrganizationsByUser(this.userId).subscribe(
      data => 
      {
        this.organizations = data;
      },
      error => {
        this.errorListUsers = true;
      }
    );
  }

  editOrganization(organizationId: number){
    this.organizationService.getOrganization(organizationId).subscribe(res =>{
      this.router.navigate(["/organization-department/" + organizationId]);
    });
  }

}

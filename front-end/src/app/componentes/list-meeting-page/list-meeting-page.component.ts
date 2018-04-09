import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Organization } from '../models/organization.model';
import { OrganizationService } from '../services/organization.service';


@Component({
  selector: 'list-meeting-page',
  templateUrl: './list-meeting-page.component.html',
  styleUrls: ['./list-meeting-page.component.scss']
})
export class ListMeetingPageComponent implements OnInit {

  public organizations: Array<Organization>;
  public userId: number; 

  errorListUsers:boolean = false;

  constructor(private organizationService: OrganizationService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // Cogemos las organizaciones que el usuario tenga
    this.userId = 10;
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

}

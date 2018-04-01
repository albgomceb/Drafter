import { NgModule, Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { OrganizationService } from '../services/organization.service';
import { User } from '../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

import { Meeting } from '../models/meeting.model';
import { Option } from '../models/option.model';
import { Router } from '@angular/router';
import { Organization } from '../models/organization.model';

@Component({
  selector: 'meeting-page',
  templateUrl: './meeting-page.component.html',
  styleUrls: ['./meeting-page.component.scss']
})
export class MeetingPageComponent implements OnInit {

  hideme=[]

  users: Array<User>;
  attendants: Array<Option>;
  organizations: Array<Organization>

  errorListUsers:boolean = false;
  meeting: Meeting;

  constructor(private userService: UserService, private organizationService: OrganizationService, private router:Router) {}

  ngOnInit() {

    this.meeting = new Meeting();
    this.attendants = new Array<Option>();

    this.userService.getUsers().subscribe(
      data => 
      {
        this.users = data;
      },
      error => {
        this.errorListUsers = true;
      }
    );

    this.organizationService.getOrganizations().subscribe(
      data => 
      {
        this.organizations = data;
      },
      error => {
        this.errorListUsers = true;
      }
    );

  } 

  addAttendant(attendant:Option){
    this.attendants.push(attendant);
  }

  onSubmit(meeting){
      this.meeting.setAttendants(this.attendants);
      this.userService.saveMeeting(meeting).subscribe((res:any) =>{
        this.router.navigate(['/agenda/'+res.id])
      });

  }


}

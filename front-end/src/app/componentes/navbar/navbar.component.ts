import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Meeting } from '../models/meeting.model';
import { MeetingService } from '../services/meeting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private notifications : Array<Meeting>;
  private clicked : boolean;

  constructor(private loginService: LoginService,
    private meetingService : MeetingService,
    private router : Router) { }

  ngOnInit() {
    this.meetingService.getNotifications().subscribe(meetings => {
      this.notifications = meetings;     
    });
    this.clicked = false;
  }

  public hideNotification(meeting : Meeting){
    this.meetingService.hideNotification(meeting.id).subscribe(res =>{
      this.notifications = res;
    })  
  }

  public convert(){
    this.clicked = !this.clicked;
  }

  public getLoginService(): LoginService {
    return this.loginService;
  }

}

import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Meeting } from '../models/meeting.model';
import { MeetingService } from '../services/meeting.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable, Subscription } from 'rxjs';
import { Configuration } from '../../constants/configuration';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private notifications : Array<Meeting>;
  private notificationsLength : number;
  private clicked : boolean;
  private staticUrl : String;
  private hasNewNotifications : boolean;

  public $counter: Observable<number>;
  private subscription: Subscription;
  private spentSeconds: number;

  constructor(private loginService: LoginService,
    private meetingService : MeetingService,
    private router : Router) { }

  ngOnInit() {
    this.meetingService.getNotifications().subscribe(meetings => {
      this.notifications = meetings;   
      this.notificationsLength = this.notifications.length;  
      //TODO Queda por hacer que en lugar de notificationsLength se lea la propiedad showNotification de participant (si == null es que no se ha visto la notificacion)
    });
    this.clicked = false;
    this.staticUrl = environment.baseApi;

    //CONTADOR        
    this.$counter = Observable.interval(1000).map((x) => {    
      return x;
    });

    this.subscription = this.$counter.subscribe((x) => {
      this.spentSeconds = x;
      if(this.spentSeconds%Configuration.pollingNotificationTime === 0){
        this.meetingService.getNotifications().subscribe(meetings => {
          this.notifications = meetings; 
          if(this.notifications.length > this.notificationsLength){
            this.hasNewNotifications = true;
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public showNotifications(){
    if(this.clicked){
      this.meetingService.showNotifications().subscribe(res =>{
        this.notifications = res;
        this.notificationsLength = this.notifications.length;
      });
    }
  }

  public hideNotification(meeting : Meeting){
    this.meetingService.hideNotification(meeting.id).subscribe(res =>{
      this.notifications = res;
    });
  }

  public convert(){
    this.clicked = !this.clicked;
  }

  public getLoginService(): LoginService {
    return this.loginService;
  }

}

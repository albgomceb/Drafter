import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Meeting } from '../models/meeting.model';
import { MeetingService } from '../services/meeting.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Configuration } from '../../constants/configuration';
import { RealTimeService } from '../../services/real-time.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private notifications : Array<Meeting>;
  private clicked : boolean;
  private hasNewNotifications : boolean;

  public $counter: Observable<number>;
  private subscription: Subscription;
  private spentSeconds: number;

  constructor(private loginService: LoginService,
    private meetingService : MeetingService,
    private router : Router,
    private realTimeService : RealTimeService) { }

  ngOnInit() {
    this.meetingService.getNotifications().subscribe(meetings => {      
      this.hasNewNotifications = false;
      this.notifications = meetings;   
      for(let meeting of meetings){
        if(meeting.showNotification === null){
          this.hasNewNotifications = true;
          break;
        }   
      }
    });

    this.clicked = false;

    //CONTADOR        
    this.$counter = Observable.interval(1000).map((x) => {    
      return x;
    });

    this.subscription = this.$counter.subscribe((x) => {
      this.spentSeconds = x;
      if(this.spentSeconds%Configuration.pollingNotificationTime === 0){
        this.meetingService.getNotifications().subscribe(meetings => {
          this.notifications = meetings; 
          for(let meeting of meetings){
            if(meeting.showNotification === null){
              this.hasNewNotifications = true;
              break;
            }
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
    if(this.hasNewNotifications){
      this.hasNewNotifications = false;
    }
  }

  public goMeeting(meetingId : number){
    this.router.navigate(["/meeting/"+meetingId]);
  }

  public getLoginService(): LoginService {
    return this.loginService;
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { take, map } from 'rxjs/operators';
import { User } from '../../../models/user.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SixHatsService } from '../../../services/sixhats.service';
import { SixHats } from '../../../models/sixHats.model';
import { Hat } from '../../../models/hat.model';


@Component({
  selector: 'six-hats-meeting',
  templateUrl: './six-hats-meeting.component.html',
  styleUrls: ['./six-hats-meeting.component.scss']
})
export class SixHatsMeetingComponent implements OnInit {

  @Input()
  public meetingId:number;
  @Input()
  public attendants:Array<any>;
  @Output()
  public finishMeeting = new EventEmitter<number>();

  public colorList : Array<String>; 
  public countDown;
  public count = 6;
  public actualUser : User;
  public sixHats : SixHats;

   constructor(private sixHatsService: SixHatsService,
    private router: Router) {
  }   

  ngOnInit() {
    // var user = new User();
    // user.name = "nombre";
    // var user1 = new User();
    // user1.name = "nombre1";
    // var users = [user, user1];
    // this.attendants = users;
    // this.actualUser = user;
    this.getSixHats(this.meetingId);
    this.countDown = timer(0,1000).pipe(
      take(this.count),
      map(()=> --this.count)); 
  }

  getSixHats(id : number){
    this.sixHatsService.getSixHatsByMeeting(id).subscribe(sixHats => {
      this.sixHats = sixHats;
    });
  }

  saveSixHats(){
    this.sixHatsService.saveSixHats(this.sixHats, this.meetingId).subscribe(res =>{
      this.router.navigate(["/meeting/"+this.meetingId]);
    });
  }

  finish(){
    this.finishMeeting.emit(this.meetingId);
  }

}

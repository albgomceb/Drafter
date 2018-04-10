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

  public countDown;
  public count = 6;
  public actualUser : User;
  public sixHats : SixHats;
  public colorUser : String;

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
    this.sixHatsService.getSixHatsByMeeting(this.meetingId).subscribe(sixHats => {
      this.sixHats = sixHats;
      this.getHatColor('88');
    });
    this.sortAttendants();
    this.actualUser = this.attendants[0];
    this.countDown = timer(0,1000).pipe(
      take(this.count),
      map(()=> --this.count)); 
  }


  saveSixHats(){
    this.sixHatsService.saveSixHats(this.sixHats, this.meetingId).subscribe(res =>{
      this.router.navigate(["/meeting/"+this.meetingId]);
    });
  }

  sortAttendants(){
    this.attendants = this.attendants.sort();
  }

  getHatColor(userId : String){
    let attIndex;
    
    for(let i=0; i<this.attendants.length;i++){
      if(this.attendants[i].id === userId){
        attIndex = i;
      }
    }
    
    for(let hat of this.sixHats.hats){
      if(hat.order === attIndex){
        this.colorUser = hat.color;
      }
    }
  }

  finish(){
    this.finishMeeting.emit(this.meetingId);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { take, map } from 'rxjs/operators';
import { User } from '../../../models/user.model';

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
  public countDown;
  public count = 6;
  //participants: Array de participantes (users y value=sombrero)
  public participants = new Map();
  public participantsNumber = 2;
  public actualUser : User;
  public colorString;

   constructor() {
    this.countDown = timer(0,1000).pipe(
      take(this.count),
      map(()=> --this.count)); 
  }   

  ngOnInit() {
    this.assignHats();
    
  }

  assignHats(){
    // El orden de los sombreros es 
    // [blanco (0), rojo (1), negro (2), amarillo (3), verde (4), azul (5)]
    var user = new User();
    user.name = "nombre";
    var user1 = new User();
    user1.name = "nombre1";
    var users = [user, user1];
    this.actualUser = user;

    var color = this.getHat();
    for(let user of users){
      this.participants.set(user, color);
      if(color == 5)
        color = 0;
      else
        color++;
    }
    if(this.participants.get(user) == 0)
      this.colorString = "BLANCO";
    else if(this.participants.get(user) == 0)
      this.colorString = "BLANCO";
    this.colorString
    console.log("participantes antes");
    console.log([this.participants.keys()]);
    console.log("colores antes");
    console.log([this.participants.values()]);
  }

  reassignHats(){
    for(let participant of Array.from(this.participants.keys())){
      var color = this.participants.get(participant);
      
      if(color == 5)
        color = 0;       
      else
        color++;
      this.participants.set(participant, color); 
    }
    console.log("participantes después");
    console.log([this.participants.keys()]);
    console.log("colores después");
    console.log([this.participants.values()]);
  }

  getHat() {
    return Math.floor(Math.random() * 6);
}

}

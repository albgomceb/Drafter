import { Component, OnInit, Input } from '@angular/core';
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

  public colorList : Array<String>; 
  public countDown;
  public count = 6;
  public actualUser : User;
  public sixHats : SixHats;

   constructor(private sixHatsService: SixHatsService,
    private router: Router) {
  }   

  ngOnInit() {
    this.colorList = new Array(6);
    this.getSixHats(this.meetingId);
    this.getColorList();
    this.countDown = timer(0,1000).pipe(
      take(this.count),
      map(()=> --this.count)); 
  }

  getSixHats(id : number){
    this.sixHatsService.getSixHatsByMeeting(id).subscribe(sixHats => {
      this.sixHats = sixHats;
    });
  }

  getColorList(){
    for(let hat of this.sixHats.hats){
      this.colorList.splice(hat.order, 1, hat.color);
    }
  }

  saveSixHats(){
    this.sixHatsService.saveSixHats(this.sixHats, this.meetingId).subscribe(res =>{
      this.router.navigate(["/meeting/"+this.meetingId]);
    });
  }

  // assignHats(){
  //   // El orden de los sombreros es 
  //   // [blanco (0), rojo (1), negro (2), amarillo (3), verde (4), azul (5)]
  //   var user = new User();
  //   user.name = "nombre";
  //   var user1 = new User();
  //   user1.name = "nombre1";
  //   var users = [user, user1];
  //   this.actualUser = user;

  //   // var firstColor = 'RED';
  //   // for(var i=0; i<6; i++){
  //   //   this.colors[i] = 
  //   // }
  //   // var color = this.getHat();
  //   // for(let user of users){
  //   //   this.participants.set(user, color);
  //   //   if(color == 5)
  //   //     color = 0;
  //   //   else
  //   //     color++;
  //   // }
  //   // console.log("participantes antes");
  //   // console.log([this.participants.keys()]);
  //   // console.log("colores antes");
  //   // console.log([this.participants.values()]);
  // }

  reassignHats(){

    for(let participant of this.attendants){
      //TODO var color = participant.
      var hat : Hat;
      hat.color = color;
      hat.order = 
      this.sixHats.hats.push();
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

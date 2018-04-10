import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { take, map } from 'rxjs/operators';
import { User } from '../../../models/user.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SixHatsService } from '../../../services/sixhats.service';
import { SixHats } from '../../../models/sixHats.model';
import { Hat } from '../../../models/hat.model';
import { RealTimeService, WSResponseType } from '../../../../services/real-time.service';


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
  public sixHats : SixHats = new SixHats();
  public currentHat : Hat;
  public currentConclusion : String;

   constructor(private sixHatsService: SixHatsService,
    private router: Router,
    private realTimeService: RealTimeService,
    private activeRoute: ActivatedRoute) {
  }   

  ngOnInit() {
    this.actualUser = this.attendants[0];
    console.log("AAA ", this.actualUser);
    this.sixHatsService.getSixHatsByMeeting(this.meetingId).subscribe(sixHats => {
      this.sixHats = sixHats;
      this.getHatColor('88');
      this.addFirstConclusion();  
      console.log("BBB ", this.sixHats);    
    });
    this.sortAttendants();
    this.countDown = timer(0,1000).pipe(
      take(this.count),
      map(()=> --this.count)); 

    //Parte del WebSocket
    this.realTimeService.connect(this.meetingId, () => {
      var i = 1;
      for(var ht of this.sixHats.hats) {
        this.realTimeService.register('h'+i, ht.conclusions);
        i++;
      }
      this.realTimeService.subscribe();
    });
  }

  edit(event, i, hatIndex) {
    this.realTimeService.send('/sixHats/save/', 
                            WSResponseType.SET, 
                            'h'+i,  
                            this.sixHats.hats[hatIndex].conclusions[i], 
                            {index: i});
  }

  enter(event) {
    if(event.keyCode == 13) {
      event.target.blur();
      return false;
    }

    return true;
  }

  saveSixHats(){
    this.sixHatsService.saveSixHats(this.sixHats, this.meetingId).subscribe(res =>{
      this.router.navigate(["/meeting/"+this.meetingId]);
      this.sixHats = res;
      this.getHatColor('88');
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
        console.log("FUNCIONA ", hat);
        
        this.currentHat = hat;
      }
    }
  }

  addFirstConclusion(){
    for(let hat of this.sixHats.hats){
      if(hat == this.currentHat && hat.conclusions.length == 0){
        hat.conclusions[0] = "aa"
      }
    }
  }

  addConclusion(hat : Hat){
    for(let ht of this.sixHats.hats){
      if(ht === this.currentHat){
        ht.conclusions.push(this.currentConclusion);
      }
    }
    console.log(this.sixHats.hats);
  } 

  checkNotBlank(string : String) : boolean{
    var res = true;

    if(string.trim().length == 0){
      res = false;
    }

    return res;
  }

  finish(){
    this.finishMeeting.emit(this.meetingId);
  }

}

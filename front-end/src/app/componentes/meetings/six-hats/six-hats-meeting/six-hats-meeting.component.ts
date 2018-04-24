import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, NgModule } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { take, map } from 'rxjs/operators';
import { User } from '../../../models/user.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SixHatsService } from '../../../services/sixhats.service';
import { SixHats } from '../../../models/sixHats.model';
import { Hat } from '../../../models/hat.model';
import { RealTimeService, WSResponseType } from '../../../../services/real-time.service';
import { Option } from '../../../models/option.model';
import { UserService } from '../../../services/user.service';
import { LoginService } from '../../../services/login.service';
import { HatConclusion } from '../../../models/HatConclusion.model';
import { Participant } from '../../../models/participant.model';


@Component({
  selector: 'six-hats-meeting',
  templateUrl: './six-hats-meeting.component.html',
  styleUrls: ['./six-hats-meeting.component.scss']
})
export class SixHatsMeetingComponent implements OnInit {

  @Input()
  public meetingId:number;
  @Input()
  public meetingInfo;
  @Input()
  public attendants:Array<any>;
  @Output()
  public finishMeeting = new EventEmitter<number>();

  public countDown;
  public count = 6;
  public currentParticipant : Participant = new Participant();
  public sixHats : SixHats = new SixHats();
  public currentHat : Hat = new Hat();
  public userId = '';

   constructor(private sixHatsService: SixHatsService,
    private router: Router,
    private realTimeService: RealTimeService,
    private loginService: LoginService,
    private userService: UserService) {
  }   

  ngOnInit() {    
    this.sixHatsService.getSixHatsByMeeting(this.meetingId).subscribe(sixHats => {
      this.sixHats = sixHats;     
      
      this.userService.getParticipant(this.meetingId).subscribe(participant => {
        this.currentParticipant = participant;
        console.log("current participant",this.currentParticipant);
        this.sortAttendants();
        this.getCurrentHat();
        console.log("current hat ",this.currentHat);
        this.addFirstConclusion(); 
      });
      // this.userId = this.attendants[0].id;
      
    });
    this.countDown = timer(0,1000).pipe(
      take(this.count),
      map(()=> --this.count)); 

    //Parte del WebSocket
    this.realTimeService.connect(this.meetingId, () => {
      // this.realTimeService.register('hats', this.sixHats.hats, conclusion => {
      //   console.log("AAA",conclusion.data.index);
      //     // this.currentHat.hatConclusions[conclusion.data.index] = conclusion.model;

      //   if (conclusion.data.action === "pop"){
      //     this.currentHat.hatConclusions.splice(conclusion.data.index, 1);
      //   }
      //   else{
      //     this.currentHat.hatConclusions.splice(conclusion.data.index, 1, conclusion.model);
      //     // this.currentHat.hatConclusions[conclusion.data.index] = conclusion.model;
      //   }
        
      // });
      for(let hat of this.sixHats.hats){
        this.realTimeService.register('hat-'+hat.color, hat.hatConclusions);
      }
      
      this.realTimeService.subscribe();
    });
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
      this.getCurrentHat();
    });
  }

  sortAttendants(){
    this.attendants = this.attendants.sort();
  }

  getCurrentHat(){
    let attIndex : number = -1;
    
    for(let i=0; i<this.attendants.length;i++){ 
      if(this.attendants[i].id === this.currentParticipant.id+""){
        attIndex = i;
        break;
      }
    }
    
    for(let hat of this.sixHats.hats){            
      if(hat.order === attIndex){        
        this.currentHat = hat;
        
      }
    }
  }

  addFirstConclusion(){
    
      if(this.currentHat.hatConclusions.length === 0){
        this.currentHat.hatConclusions[0] = new HatConclusion();
        this.currentHat.hatConclusions[0].id = 0;
        this.currentHat.hatConclusions[0].version = 0;
        this.currentHat.hatConclusions[0].text = "";
        this.currentHat.hatConclusions[0].isInput = true;
    }
  }

  addConclusion(){
    var i=0;                            
    for(var con of this.currentHat.hatConclusions) {
      if(!con.text || con.text.trim().length == 0)
        this.currentHat.hatConclusions.splice(i, 1);
      
      i++;
    }

    var length = this.currentHat.hatConclusions.length;
    this.currentHat.hatConclusions.push(new HatConclusion());
    this.currentHat.hatConclusions[length].isInput = true;
    this.currentHat.hatConclusions[length].text = "";
    this.currentHat.hatConclusions[length].id = 0;
    this.currentHat.hatConclusions[length].version = 0;
  } 

  deleteConclusion(conclusionId : number, conclusionIndex : number) {
    console.log(conclusionId);
    this.realTimeService.send('/sixHats/delete/' + conclusionId + '/', 
                                    WSResponseType.POP, 
                                    'hat-'+this.currentHat.color,
                                    {}, 
                                    {id: conclusionId});
  }

  convert(conclusion, conclusionIndex){

    //Si la actual conclusion tiene longitud > 0 y además la conclusion es un input, se convierte en texto
    if(this.checkNotBlank(conclusion.text) && conclusion.isInput) {
      conclusion.isInput = false;
      this.realTimeService.send('/sixHats/save/'+this.currentHat.id+'/', 
                            WSResponseType.PUSH, 
                            'hat-'+this.currentHat.color,  
                            conclusion, 
                            {id: conclusion.id, noself: true});

    //Si la conclusion es un texto, se convierte en input
    } else if(!conclusion.isInput) {
      conclusion.isInput = true;
      if(conclusion.text.trim() == 0)
        this.deleteConclusion(conclusion.id, conclusionIndex);
        
    }
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

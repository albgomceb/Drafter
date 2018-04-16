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
import { SixHatsConclusion } from '../../../models/sixHatsConclusion.model';
import { LoginService } from '../../../services/login.service';


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
  public actualUser : User = new User();
  public sixHats : SixHats = new SixHats();
  public currentHat : Hat = new Hat();
  public userId = 0;

   constructor(private sixHatsService: SixHatsService,
    private router: Router,
    private realTimeService: RealTimeService,
    private loginService: LoginService) {
  }   

  ngOnInit() {    
    this.sixHatsService.getSixHatsByMeeting(this.meetingId).subscribe(sixHats => {
      this.sixHats = sixHats;      
      this.addFirstConclusion(); 
      this.sortAttendants();
      //this.actualUser = this.attendants[0];
      //this.loginService.getLoginUser().subscribe(currentUser => this.actualUser = currentUser);
      // console.log("actualUser ", this.actualUser);
      console.log(this.loginService.getPrincipal());
      this.userId = this.loginService.getPrincipal().id;
      console.log(this.attendants);
      this.getHatColor(this.userId);
    });
    this.countDown = timer(0,1000).pipe(
      take(this.count),
      map(()=> --this.count)); 

    //Parte del WebSocket
    this.realTimeService.connect(this.meetingId, () => {
      this.realTimeService.register('h', this.sixHats.hats);
      this.realTimeService.subscribe();
    });
  }

  edit(event, hatIndex) {
    this.realTimeService.send('/sixHats/save/', 
                            WSResponseType.SET, 
                            'h',  
                            this.sixHats.hats[hatIndex], 
                            {index: hatIndex});
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
      this.getHatColor(this.userId);
    });
  }

  sortAttendants(){
    this.attendants = this.attendants.sort();
  }

  getHatColor(userId){
    let attIndex;
    
    for(let i=0; i<this.attendants.length;i++){
      if(this.attendants[i].userId === userId){
        attIndex = i;
      }
    }
    
    for(let hat of this.sixHats.hats){
      if(hat.order === attIndex){        
        this.currentHat = hat;
      }
    }
  }

  addFirstConclusion(){
    for(let hat of this.sixHats.hats){
      if(hat.conclusions.length == 0){
        hat.conclusions[0] = new SixHatsConclusion();
        hat.conclusions[0].id = 0;
        hat.conclusions[0].text = "";
        hat.conclusions[0].isInput = true;
      }
    }
  }

  addConclusion(){
    var i=0;                            
    for(var con of this.currentHat.conclusions) {
      if(!con.text || con.text.trim().length == 0)
        this.currentHat.conclusions.splice(i, 1);
      
      i++;
    }

    var length = this.currentHat.conclusions.length;
    this.currentHat.conclusions.push(new SixHatsConclusion());
    this.currentHat.conclusions[length].isInput = true;
    this.currentHat.conclusions[length].text = "";
    this.currentHat.conclusions[length].id = i;
  } 

  removeConclusion(conclusion : SixHatsConclusion, conclusionIndex : number){ 
    if(!conclusion.id || conclusion.id == 0)
      this.currentHat.conclusions.splice(conclusionIndex, 1);
    else
      this.deleteConclusion(conclusion.id);
  }

  private deleteConclusion(id: number) {
    this.realTimeService.send('/conclusion/delete/' + id + '/', 
                                    WSResponseType.POP, 
                                    'conclusions',  
                                    {}, 
                                    {id: id});
  }

  convert(conclusion, hatIndex, hat){

    //Si la actual conclusion tiene longitud > 0 y además la conclusion es un input, se convierte en texto
    if(this.checkNotBlank(conclusion.text) && conclusion.isInput) {
      conclusion.isInput = false;
      this.realTimeService.send('/sixHats/save/', 
                            WSResponseType.SET, 
                            'h',  
                            this.sixHats.hats[hatIndex], 
                            {index: hatIndex});
        
      // var i=0;                 
      // for(var con of this.currentHat.conclusions) {
      //   if(!con.text || con.text.trim().length == 0 || !con.id || con.id == 0)
      //     this.currentHat.conclusions.splice(i, 1);
        
      //   i++;
      // } 

    //Si la conclusion es un texto, se convierte en input
    } else if(!conclusion.isInput) {
      conclusion.isInput = true;
      if(conclusion.text.trim() == 0)
        this.deleteConclusion(conclusion.id);
        
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

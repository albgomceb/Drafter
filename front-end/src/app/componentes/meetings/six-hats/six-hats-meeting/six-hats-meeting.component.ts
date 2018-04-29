import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, NgModule, ElementRef } from '@angular/core';
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
import { Observable, Subscription } from 'rxjs';


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

  //----------------------- Atributos del meeting -----------------------
  public currentParticipant : Participant = new Participant();
  public sixHats : SixHats = new SixHats();
  public currentHat : Hat = new Hat();

  //----------------------- Atributos del contador -----------------------
  private future: number;
  private timemilis: number;
  private diff: number;
  private $counter: Observable<number>;
  private subscription: Subscription;
  private message: string;

  //----------------------- Constructor -----------------------
   constructor(private sixHatsService: SixHatsService,
    private router: Router,
    private realTimeService: RealTimeService,
    private loginService: LoginService,
    private userService: UserService) {
      this.timemilis = 12000;
  }   

  //----------------------- OnInit -----------------------
  ngOnInit() {    
    this.sixHatsService.getSixHatsByMeeting(this.meetingId).subscribe(sixHats => {
      this.sixHats = sixHats;     
      
    //WEBSOCKET
    this.realTimeService.connect(this.meetingId, () => {
      for(let hat of this.sixHats.hats){
        this.realTimeService.register('hat-'+hat.color, hat.hatConclusions);
      }
      
      this.realTimeService.register('sixHats-'+this.meetingId, [], sixHats => {
        
        this.sixHats = sixHats.model;
        this.sortAttendants();
        this.getCurrentHat();
      });

      this.realTimeService.subscribe();
    });
      this.userService.getParticipant(this.meetingId).subscribe(participant => {
        this.currentParticipant = participant;
        this.sortAttendants();
        this.getCurrentHat();
        this.addFirstConclusion(); 
      });      
    });
    

    //CONTADOR
    this.future = new Date().getTime() + this.timemilis;
    
    this.$counter = Observable.interval(1000).map((x) => {        
        this.diff = Math.round(Math.floor(this.future - new Date().getTime()) / 1000);
        return x;
    });

    this.subscription = this.$counter.subscribe((x) => this.message = this.countdown(this.diff));
   
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // ----------------------- Métodos de instanciación ----------------------

  countdown(t) {
    var minutes, seconds;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;
    var minutesText : string = "";
    var secondsText : string = "";

    if(minutes.toString().length == 1 ){
      minutesText = "0"+minutes;
    }
    else{
      minutesText = minutes;
    }

    if(seconds.toString().length == 1 ){
      secondsText = "0"+seconds
    }
    else{
      secondsText = seconds;
    }

    return [
        minutesText,
        secondsText
    ].join(':');
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

  // ----------------------- Métodos para añadir/eliminar una conclusión ----------------------

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

  convert(conclusion, conclusionIndex){

    //Si la actual conclusion tiene longitud > 0 y además la conclusion es un input, se convierte en texto
    if(this.checkNotBlank(conclusion.text) && conclusion.isInput) {
      conclusion.isInput = false;
      this.realTimeService.send('/sixHats/save/'+this.currentHat.id+'/', 
                            WSResponseType.PUSH, 
                            'hat-'+this.currentHat.color,  
                            conclusion, 
                            {id: conclusion.id |0});

    //Si la conclusion es un texto, se convierte en input
    } else if(!conclusion.isInput) {
      conclusion.isInput = true;
      if(conclusion.text.trim() == 0)
        this.deleteConclusion(conclusion.id, conclusionIndex);
        
    }
  }

  deleteConclusion(conclusionId : number, conclusionIndex : number) {
    this.realTimeService.send('/sixHats/delete/' + conclusionId + '/', 
                                    WSResponseType.POP, 
                                    'hat-'+this.currentHat.color,
                                    {}, 
                                    {id: conclusionId});
  }

  enter(event) {
    if(event.keyCode == 13) {
      event.target.blur();
      return false;
    }

    return true;
  }
  
  checkNotBlank(string : String) : boolean{
    var res = true;

    if(string.trim().length == 0){
      res = false;
    }

    return res;
  }

  // ----------------------- Reasignación de sombrero (guardado de SixHats) ----------------------

  // saveSixHats(){
  //   this.sixHatsService.saveSixHats(this.sixHats, this.meetingId).subscribe(res =>{
  //     this.router.navigate(["/meeting/"+this.meetingId]);
  //     this.sixHats = res;
  //     this.getCurrentHat();
  //   });
  // }

  saveSixHats(){
    this.realTimeService.send('/sixHats/reassign/', 
                            WSResponseType.SET, 
                            'sixHats-'+this.meetingId,  
                            {}, 
                            {id: this.meetingId});
  }

  // ----------------------- Finalización del meeting ----------------------

  finish(){
    this.finishMeeting.emit(this.meetingId);
  }

}

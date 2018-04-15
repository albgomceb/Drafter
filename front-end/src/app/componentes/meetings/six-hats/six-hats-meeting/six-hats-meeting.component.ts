import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { take, map } from 'rxjs/operators';
import { User } from '../../../models/user.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SixHatsService } from '../../../services/sixhats.service';
import { SixHats } from '../../../models/sixHats.model';
import { Hat } from '../../../models/hat.model';
import { RealTimeService, WSResponseType } from '../../../../services/real-time.service';
import { Option } from '../../../models/option.model';
import { SixHatsConclusion } from '../../../models/conclusion.model';


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
  public actualUser : User = new User();
  public sixHats : SixHats = new SixHats();
  public currentHat : Hat = new Hat();

   constructor(private sixHatsService: SixHatsService,
    private router: Router,
    private realTimeService: RealTimeService) {
  }   

  ngOnInit() {
    console.log("AAA ", this.actualUser);
    this.sixHatsService.getSixHatsByMeeting(this.meetingId).subscribe(sixHats => {
      this.sixHats = sixHats;
      this.addFirstConclusion(); 
      this.sortAttendants();
      this.actualUser = this.attendants[0];
      this.getHatColor('88');
    });
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

  edit(event, hatIndex) {
    this.realTimeService.send('/sixHats/save/'+this.meetingId, 
                            WSResponseType.SET, 
                            'h'+hatIndex,  
                            this.sixHats.hats[hatIndex].conclusions[this.sixHats.hats.length-1], 
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
        this.currentHat = hat;
      }
    }
  }

  addFirstConclusion(){
    for(let hat of this.sixHats.hats){
      if(hat.conclusions.length == 0){
        hat.conclusions[0] = new SixHatsConclusion();
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

  convert(conclusion){
    conclusion.number = 1;

    //Si la actual conclusion tiene longitud > 0 y además la conclusion es un input, se convierte en texto
    if(this.checkNotBlank(conclusion.text) && conclusion.isInput) {
      conclusion.isInput = false;
      this.realTimeService.send('/conclusion/save/', 
                                  WSResponseType.PUSH, 
                                  'conclusions',  
                                  conclusion, 
                                  {id: conclusion.id});
        
      var i=0;                 
      for(var con of this.currentHat.conclusions) {
        if(!con.text || con.text.trim().length == 0 || !con.id || con.id == 0)
          this.currentHat.conclusions.splice(i, 1);
        
        i++;
      } 

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

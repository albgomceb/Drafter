import { Component, OnInit, Input } from '@angular/core';
import { Idea } from '../../../models/idea.model';
import { Router, ActivatedRoute } from '@angular/router';
import { IdeaService } from '../../../services/idea.service';
import { Pros } from '../../../../models/pros';
import { RealTimeService, WSResponseType } from '../../../../services/real-time.service';
import { Cons } from '../../../../models/cons';


@Component({
  selector: 'ideas-pros-cons',
  templateUrl: './ideas-pros-cons.component.html',
  styleUrls: ['./ideas-pros-cons.component.scss']
})
export class IdeasProsConsComponent implements OnInit {

  public ideas: Array<Idea>;
  public errorListIdeas:boolean = false;
  public hasEdit: boolean = true;
  @Input()
  public meetingId: number;
  

  constructor(private ideaService: IdeaService, private realTimeService: RealTimeService, private activeRoute: ActivatedRoute,) { }

  ngOnInit() {

    // this.meetingId = this.activeRoute.snapshot.params['id'];

    this.ideaService.getIdeas().subscribe(
      data => 
      {
        this.ideas = data;
        this.realTimeService.connect(this.meetingId, () => {
          var i = 1;
          for(var idea of this.ideas) {
            this.realTimeService.register('p'+i, idea.pros);
            this.realTimeService.register('c'+i, idea.cons);
            i++;
          }
          this.realTimeService.subscribe();
          });

      },
      error => {
        this.errorListIdeas = true;
      }
    );
    

  }

  editPro(event) {
    if(this.hasEdit) {
        var iidea = event.target.dataset.iidea;
        var ipro = event.target.dataset.ipro;
        var content = event.target.textContent.trim();
        var pro: Pros = this.ideas[iidea-1].pros[ipro];
        pro.pro = content;

        // Delete if blank and else update
        if(!content || content.length==0 || /^\s*$/.test(content)) {
          this.realTimeService.send('/pro/delete/' + pro.id + "/", 
                                  WSResponseType.POP, 
                                  'p'+iidea,  
                                  {}, 
                                  {index: iidea});
        } else {
          this.realTimeService.send('/pro/save/', 
                                  WSResponseType.SET, 
                                  'p'+iidea,  
                                  this.ideas[iidea-1].pros[ipro], 
                                  {index: ipro});
        }
    }
  }

  editCon(event) {
    if(this.hasEdit) {
        var iidea = event.target.dataset.iidea;
        var icon = event.target.dataset.icon;
        var content = event.target.textContent.trim();
        var con: Cons = this.ideas[iidea-1].cons[icon];
        con.con = content;

        // Delete if blank and else update
        if(!content || content.length==0 || /^\s*$/.test(content)) {
          this.realTimeService.send('/con/delete/' + con.id + "/", 
                                  WSResponseType.POP, 
                                  'c'+iidea,  
                                  {}, 
                                  {index: iidea});
        } else {
          this.realTimeService.send('/con/save/', 
                                  WSResponseType.SET, 
                                  'c'+iidea,  
                                  this.ideas[iidea-1].cons[icon], 
                                  {index: icon});
        }
    }
  }

  enter(event) {
    if(event.keyCode == 13) {
      event.target.blur();
      return false;
    }

    return true;
  }


  addPro(event) {
    var index = event.target.dataset.index;
    var idea = this.ideas[index-1];

    // Only one empty
    var i = 0;
    for(var p of idea.pros) {
      if(!p.pro || p.pro.length==0 || /^\s*$/.test(p.pro))
        idea.pros.splice(i, 1);
      i++;
    }

    idea.pros.push({id: 0, ideaId: idea.id, pro: ""});
  }

  addCon(event) {
    var index = event.target.dataset.index;
    var idea = this.ideas[index-1];

    // Only one empty
    var i = 0;
    for(var c of idea.cons) {
      if(!c.con || c.con.length==0 || /^\s*$/.test(c.con))
        idea.cons.splice(i, 1);
      i++;
    }

    idea.cons.push({id: 0, ideaId: idea.id, con: ""});
  }

}

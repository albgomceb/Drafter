import { Vote } from './../models/vote.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RealTimeService, WSResponseType } from '../../services/real-time.service';
import { Option } from '../models/option.model';
import { ChatMessage } from '../../models/chat-message';
import { ActivatedRoute } from '@angular/router';
import { IdeaService } from './../services/idea.service';
import { Idea } from './../models/idea.model';


@Component({
  selector: 'idea-vote-page',
  templateUrl: './idea-vote-page.component.html',
  styleUrls: ['./idea-vote-page.component.scss']
})
export class IdeaVotePageComponent implements OnInit {

  public ideas: Array<Idea>;
  public hasEdit: boolean = true;
  public meetingId: number;

  constructor(private activeRoute: ActivatedRoute, private realTimeService: RealTimeService, private ideaService: IdeaService) { }

  ngOnInit() {
    this.ideas = new Array<Idea>();
    this.meetingId = this.activeRoute.snapshot.params['id'];
    this.realTimeService.connect(this.meetingId, () => {

      this.ideaService.getIdeasByMeeting(25).subscribe(idea => {
        this.ideas = idea;

        var i = 1;
        for (var ide of this.ideas) {
          this.realTimeService.register('votes' + i, Array<any>(ide.votes))
          i++;
        }
        this.realTimeService.subscribe();
      });
    });
  }

  enter(event) {
    if (event.keyCode == 13) {
      event.target.blur();
      return false;
    }

    return true;
  }

  addVote(event) {
    var index = event.target.dataset.index;
    var participantId = event.target.dataset.participantId;
    var idea = this.ideas[index - 1];
        
    idea.votes.push({id: 0, ideaId: idea.id,participantId:participantId, value:0});
  }


}

import { Participant } from './../models/participant.model';
import { Vote } from './../models/vote.model';
import { Component, OnInit, ViewChild, ElementRef, NgModule } from '@angular/core';
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
  public participantId: number;
  public meetingId: number;
  public votes: Array<Vote>;

  constructor(private activeRoute: ActivatedRoute, private realTimeService: RealTimeService, private ideaService: IdeaService) { }

  ngOnInit() {
    this.ideas = new Array<Idea>();
    //this.participantId=
    this.meetingId = this.activeRoute.snapshot.params['id'];
    this.ideaService.getIdeasByMeeting(25).subscribe(idea => {
      this.ideas = idea;
    });
    this.votes = new Array<Vote>();
    this.realTimeService.connect(this.meetingId, () => {
      var i = 1;
      for (var ide of this.ideas) {
        this.realTimeService.register('votes'+i, ide.votes);
        this.votes.push({ id: 0, ideaId: ide.id, participantId: this.participantId, value: 1 });
        i++;
      }
      this.realTimeService.subscribe();
    });
  }

  save(event) {
    if (this.hasEdit) {
      var iidea = event.target.dataset.iidea;
      var vote: Vote = this.votes[iidea];

      this.realTimeService.send('/vote/save/',
        WSResponseType.SET,
        'v' + iidea,
        this.votes[iidea],
        { index: iidea });
    }
  }

  delete(event) {
    if (this.hasEdit) {
      var iidea = event.target.dataset.iidea;
      var vote: Vote = this.votes[iidea];

      this.realTimeService.send('/vote/delete/' + vote.id + "/",
        WSResponseType.POP,
        'v' + iidea,
        {},
        { index: iidea });
    }

  }

}

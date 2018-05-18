import { LoginService } from './../../../services/login.service';
import { Participant } from './../../../models/participant.model';
import { UserService } from './../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Idea } from '../../../models/idea.model';
import { Vote } from '../../../models/vote.model';
import { VoteService } from '../../../services/vote.service';
import { RealTimeService } from '../../../../services/real-time.service';
import { IdeaService } from '../../../services/idea.service';


@Component({
  selector: 'idea-vote-page',
  templateUrl: './idea-vote-page.component.html',
  styleUrls: ['./idea-vote-page.component.scss']
})
export class IdeaVotePageComponent implements OnInit {

  public ideas: Array<Idea>;
  public hasVoted: boolean = false;
  public participant: Participant;
  @Input()
  public meetingId: number;
  @Output()
  public finishMeeting: EventEmitter<number> = new EventEmitter<number>();

  public votes: Array<Vote>;
  public loaded: boolean;

  constructor(private voteService: VoteService, private activeRoute: ActivatedRoute, private router: Router, private realTimeService: RealTimeService, private ideaService: IdeaService, private userService: UserService, private loginService: LoginService) { }

  ngOnInit() {
    var lock = 0;
    this.loaded = false;

    this.ideas = new Array<Idea>();
    this.userService.getParticipant(this.meetingId).subscribe(participant => {
      this.participant = participant;

      lock++;
      realTime();
    });
    this.ideaService.getIdeasByMeeting(this.meetingId).subscribe(idea => {
      this.ideas = idea;

      lock++;
      realTime();
    });

    this.votes = new Array<Vote>();
    var realTime = () => {
      if (lock != 2)
        return;

      this.realTimeService.connect(this.meetingId, () => {
        var i = 1;
        for (var ide of this.ideas) {
          this.realTimeService.register('votes' + i, ide.votes);
          this.votes.push({ id: 0, ideaId: ide.id, participantId: this.participant.id, value: 1 });
          i++;
        }
        this.realTimeService.subscribe();

        this.loaded = true;
      });
    };
  }

  save() {
    if (!this.validVotes()) {
      alert("Vote values must be between 1 and 10");
      return false;
    }else{
      this.voteService.saveVote(this.votes).subscribe(res => {
      });
      this.hasVoted = true;
    }
  }
  validVotes(){
    let res=true;
    this.votes.forEach(v=>{if (v.value == null || v.value < 1 || v.value > 10){res= false;}})
    return res;
  }

  finish() {
    this.finishMeeting.emit(this.meetingId);
  }
  cancel() {
  }

}

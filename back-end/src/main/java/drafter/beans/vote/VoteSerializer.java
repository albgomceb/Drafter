package drafter.beans.vote;

import java.util.ArrayList;
import java.util.List;

import drafter.domain.Idea;
import drafter.domain.Vote;
import drafter.services.IdeaService;
import drafter.services.ParticipantService;

public class VoteSerializer {

	public VoteBean fromVote(Vote vote) {
		VoteBean res = new VoteBean();


		res.setId(vote.getId());
		res.setValue(vote.getValue());
		res.setParticipantId(vote.getParticipant().getId());
		res.setIdeaId(vote.getIdea().getId());		

		return res;
	}

	public List<Vote> fromBean(List<VoteBean> votesBean,IdeaService ideaService,ParticipantService participantService) {
		List<Vote> votes = new ArrayList<Vote>();
		for (VoteBean ib : votesBean) {
			Vote vote = new Vote();
			Idea idea=ideaService.findById(ib.getIdeaId());
			vote.setValue(ib.getValue());
			vote.setParticipant(participantService.findById(ib.getParticipantId()));
			vote.setIdea(idea);
			idea.addVote(vote);
			votes.add(vote);
		}

		return votes;
	}

}

package drafter.beans.idea;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import drafter.beans.agenda.AgendaBean;
import drafter.beans.cons.ConsBean;
import drafter.beans.cons.ConsSerializer;
import drafter.beans.pros.ProsBean;
import drafter.beans.pros.ProsSerializer;
import drafter.beans.vote.VoteBean;
import drafter.beans.vote.VoteSerializer;
import drafter.domain.Agenda;
import drafter.domain.BrainStorming;
import drafter.domain.Conclusion;
import drafter.domain.Cons;
import drafter.domain.Idea;
import drafter.domain.Meeting;
import drafter.domain.Pros;
import drafter.domain.Vote;

public class IdeaSerializer {
	
	public IdeaBean fromIdea(Idea idea) {
		IdeaBean res = new IdeaBean();
		
		List<ConsBean> cons = new LinkedList<ConsBean>();
		for(Cons c : idea.getCons())
			cons.add(new ConsSerializer().fromCons(c));
		res.setCons(cons);
		
		List<ProsBean> pros = new LinkedList<ProsBean>();
		for(Pros p : idea.getPros())
			pros.add(new ProsSerializer().fromPros(p));
		res.setPros(pros);
		
		List<VoteBean> votes = new LinkedList<VoteBean>();
		for(Vote v : idea.getVotes())
			votes.add(new VoteSerializer().fromVote(v));
		res.setVotes(votes);
		
		res.setId(idea.getId());
		res.setBrainId(idea.getBrain().getId());
		res.setNumber(idea.getNumber());
		res.setText(idea.getText());
		
		return res;
	}
	
	public List<Idea> fromBean(List<IdeaBean> ideasBean, BrainStorming brainstorming) {
	    List<Idea> ideas = new ArrayList<Idea>();
	    int i = 1;
	    for (IdeaBean ib : ideasBean) {
	      Idea idea = new Idea();
	      idea.setNumber(i);
	      idea.setText(ib.getText());
	      idea.setPros(new ArrayList<Pros>());
	      idea.setCons(new ArrayList<Cons>());
	      idea.setVotes(new ArrayList<Vote>());
	      idea.setBrain(brainstorming);
	      brainstorming.addIdea(idea);
	      ideas.add(idea);
	      i++;
	    }

	    return ideas;
	}

}

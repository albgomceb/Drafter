package drafter.beans.idea;

import java.util.LinkedList;
import java.util.List;

import drafter.beans.cons.ConsBean;
import drafter.beans.cons.ConsSerializer;
import drafter.beans.pros.ProsBean;
import drafter.beans.pros.ProsSerializer;
import drafter.domain.Cons;
import drafter.domain.Idea;
import drafter.domain.Pros;

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
		
		res.setId(idea.getId());
		res.setBrainId(idea.getBrain().getId());
		res.setNumber(idea.getNumber());
		res.setText(idea.getText());
		
		return res;
	}

}

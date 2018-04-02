package drafter.beans.cons;

import java.util.ArrayList;
import java.util.List;

import drafter.beans.cons.ConsBean;
import drafter.domain.Idea;
import drafter.domain.Cons;

public class ConsSerializer {
	
	public ConsBean fromCons(Cons cons) {
		ConsBean res = new ConsBean();

		res.setId(cons.getId());
		res.setNumberCons(cons.getNumberCons());
		res.setCons(cons.getCons());
		res.setIdeaId(cons.getIdea().getId());

		return res;
	}

	public List<Cons> fromBean(List<ConsBean> consBean, Idea idea) {
		List<Cons> cons = new ArrayList<Cons>();
		int i = 1;
		for (ConsBean pb : consBean) {
			Cons p = new Cons();
			p.setNumberCons(i);
			p.setIdea(idea);
			p.setCons(pb.getCons());
			idea.addCons(p);
			cons.add(p);
			i++;
		}
		return cons;
	}
}

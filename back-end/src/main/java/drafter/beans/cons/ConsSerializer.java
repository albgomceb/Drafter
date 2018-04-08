package drafter.beans.cons;

import drafter.domain.Cons;
import drafter.services.ConsService;
import drafter.services.IdeaService;

public class ConsSerializer {
	
	public ConsBean fromCons(Cons c) {
		ConsBean res = new ConsBean();
		res.setId(c.getId());
		res.setIdeaId(c.getIdea().getId());
		res.setCons(c.getCons());

		return res;
	}

	public Cons fromBean(ConsBean bean, IdeaService ideaService, ConsService consService) {
		Cons res;
		if (bean.getId() == 0)
			res = new Cons();
		else
			res = consService.findById(bean.getId());

		res.setIdea(ideaService.findById(bean.getIdeaId()));
		res.setCons(bean.getCons());

		return res;
	}

}

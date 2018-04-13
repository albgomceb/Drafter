package drafter.beans.pros;

import drafter.domain.Pros;
import drafter.services.IdeaService;
import drafter.services.ProsService;

public class ProsSerializer {
	
	public ProsBean fromPros(Pros p) {
		ProsBean res = new ProsBean();
		res.setId(p.getId());
		res.setIdeaId(p.getIdea().getId());
		res.setPros(p.getPros());
		res.setNumberPros(p.getNumberPros());
		res.setVersion(p.getVersion());

		return res;
	}

	public Pros fromBean(ProsBean bean, IdeaService ideaService, ProsService prosService) {
		Pros res;
		if (bean.getId() == 0)
			res = new Pros();
		else
			res = prosService.findById(bean.getId());

		res.setIdea(ideaService.findById(bean.getIdeaId()));
		res.setPros(bean.getPros());
		res.setNumberPros(bean.getNumberPros());
		res.setVersion(bean.getVersion());

		return res;
	}

}

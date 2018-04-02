package drafter.beans.pros;

import java.util.ArrayList;
import java.util.List;
import drafter.domain.Idea;
import drafter.domain.Pros;

public class ProsSerializer {

	public ProsBean fromPros(Pros pros) {
		ProsBean res = new ProsBean();

		res.setId(pros.getId());
		res.setNumberPros(pros.getNumberPros());
		res.setPros(pros.getPros());
		res.setIdeaId(pros.getIdea().getId());

		return res;
	}

	public List<Pros> fromBean(List<ProsBean> prosBean, Idea idea) {
		List<Pros> pros = new ArrayList<Pros>();
		int i = 1;
		for (ProsBean pb : prosBean) {
			Pros p = new Pros();
			p.setNumberPros(i);
			p.setIdea(idea);
			p.setPros(pb.getPros());
			idea.addPros(p);
			pros.add(p);
			i++;
		}
		return pros;
	}
}

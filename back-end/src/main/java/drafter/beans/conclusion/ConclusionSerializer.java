package drafter.beans.conclusion;

import drafter.domain.Conclusion;
import drafter.services.AgendaService;
import drafter.services.ConclusionService;


public class ConclusionSerializer {
	
	public ConclusionBean fromConclusion(Conclusion c) {
		ConclusionBean res = new ConclusionBean();
		res.setId(c.getId());
		res.setAgendaId(c.getAgenda().getId());
		res.setConclusion(c.getConclusion());
		
		return res;
	}
	
	public Conclusion fromBean(ConclusionBean bean, AgendaService agendaService, ConclusionService conclusionService) {
		Conclusion res;
		if(bean.getId() == 0)
			res = new Conclusion();
		else
			res = conclusionService.findById(bean.getId());
		
		res.setAgenda(agendaService.findById(bean.getAgendaId()));
		res.setConclusion(bean.getConclusion());
		
		return res;
	}
}

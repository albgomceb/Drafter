package drafter.beans.conclusion;

import org.springframework.beans.factory.annotation.Autowired;

import drafter.domain.Conclusion;
import drafter.services.AgendaService;
import drafter.services.ConclusionService;

public class ConclusionSerializer {

	@Autowired
	private static AgendaService agendaService;
	
	@Autowired
	private static ConclusionService conclusionService;
	

	public static ConclusionBean fromConclusion(Conclusion c) {
		ConclusionBean res = new ConclusionBean();
		res.setAgendaId(c.getAgenda().getId());
		res.setConclusion(c.getConclusion());
		
		return res;
	}
	
	public static Conclusion fromBean(ConclusionBean bean) {
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

package drafter.beans.conclusion;

import org.springframework.beans.factory.annotation.Autowired;

import drafter.domain.Conclusion;
import drafter.services.ConclusionService;

public class ConclusionSerializer {

	//@Autowired
	//private AgendaService agendaService;
	
	@Autowired
	private ConclusionService conclusionService;
	

	public static ConclusionBean fromConclusion(Conclusion c) {
		ConclusionBean res = new ConclusionBean();
		res.setAgendaId(c.getAgenda().getId());
		res.setConclusion(c.getConclusion());
		
		return res;
	}
	
	public static Conclusion fromBean(ConclusionBean bean) {
		Conclusion res = new Conclusion();
		return res;
	}
	
}

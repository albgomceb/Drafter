package drafter.controllers;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.conclusion.ConclusionBean;
import drafter.beans.conclusion.ConclusionSerializer;
import drafter.beans.model.ModelBean;
import drafter.domain.Conclusion;
import drafter.services.AgendaService;
import drafter.services.ConclusionService;

@CrossOrigin
@RestController
@RequestMapping("/data/conclusion")
public class ConclusionController {

	@Autowired
	private AgendaService agendaService;
	
	@Autowired
	private ConclusionService conclusionService;
	
	@Autowired
	private SimpMessagingTemplate template;


	@GetMapping("/list/{agendaId}")
	public List<ConclusionBean> save(@PathVariable int agendaId) {
		List<ConclusionBean> res = new LinkedList<ConclusionBean>();
		try {
			for(Conclusion c : conclusionService.findByAgenda(agendaId))
				res.add(new ConclusionSerializer().fromConclusion(c));
		} catch(Throwable e) {
			throw e;
		}
		
		return res;
	}

	@MessageMapping("/conclusion/save/{meetingId}")
	public void save(@DestinationVariable int meetingId, ModelBean<ConclusionBean> bean) {
		Conclusion conclusion = new ConclusionSerializer().fromBean(bean.getModel(), agendaService, conclusionService);
		conclusion = conclusionService.save(conclusion);
		
		bean.setModel(new ConclusionSerializer().fromConclusion(conclusion));
		template.convertAndSend("/meeting/" + meetingId, bean);
	}
	
	@MessageMapping("/conclusion/delete/{conclusionId}/{meetingId}")
	public void delete(@DestinationVariable int conclusionId, @DestinationVariable int meetingId, String json) {
		if(conclusionId != 0)
			conclusionService.delete(conclusionId);
		template.convertAndSend("/meeting/" + meetingId, json);
	}
}
package drafter.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.model.ModelBean;
import drafter.beans.cons.ConsBean;
import drafter.beans.cons.ConsSerializer;
import drafter.domain.Cons;
import drafter.services.IdeaService;
import drafter.services.ConsService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/data/cons")
public class ConsController {

	@Autowired
	private ConsService consService;
	
	@Autowired
	private IdeaService ideaService;
	
	@Autowired
	private SimpMessagingTemplate template;


	@MessageMapping("/saveCons/{brainId}")
	public void save(@DestinationVariable int meetingId, ModelBean<ConsBean> bean) {
		Cons cons = new ConsSerializer().fromBean(bean.getModel(), ideaService, consService);
		cons = consService.save(cons);
		
		bean.setModel(new ConsSerializer().fromCons(cons));
		template.convertAndSend("/meeting/" + meetingId, bean);
	}
	
	@MessageMapping("/delete/{consId}/{brainId}")
	public void delete(@DestinationVariable int consId, @DestinationVariable int meetingId, String json) {
		if(consId != 0)
			consService.delete(consId);
		template.convertAndSend("/meeting/" + meetingId, json);
	}
}

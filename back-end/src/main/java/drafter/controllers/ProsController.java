package drafter.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.model.ModelBean;
import drafter.beans.pros.ProsBean;
import drafter.beans.pros.ProsSerializer;
import drafter.domain.Pros;
import drafter.services.IdeaService;
import drafter.services.ProsService;

@CrossOrigin
@RestController
@RequestMapping("/data/pros")
public class ProsController {

	@Autowired
	private ProsService prosService;
	
	@Autowired
	private IdeaService ideaService;
	
	@Autowired
	private SimpMessagingTemplate template;


	@MessageMapping("/pros/savePro/{meetingId}")
	public void save(@DestinationVariable int meetingId, ModelBean<ProsBean> bean) {
		Pros pros = new ProsSerializer().fromBean(bean.getModel(), ideaService, prosService);
		pros = prosService.save(pros);
		
		bean.setModel(new ProsSerializer().fromPros(pros));
		template.convertAndSend("/meeting/" + meetingId, bean);
	}
	
	@MessageMapping("/pros/delete/{prosId}/{meetingId}")
	public void delete(@DestinationVariable int prosId, @DestinationVariable int meetingId, String json) {
		prosService.delete(prosId);
		template.convertAndSend("/meeting/" + meetingId, json);
	}
}
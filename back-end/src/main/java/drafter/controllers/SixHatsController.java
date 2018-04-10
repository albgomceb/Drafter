
package drafter.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.model.ModelBean;
import drafter.beans.sixHats.SixHatsBean;
import drafter.beans.sixHats.SixHatsSerializer;
import drafter.domain.Meeting;
import drafter.domain.SixHats;
import drafter.services.HatService;
import drafter.services.MeetingService;
import drafter.services.SixHatsService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/data/sixHats")
public class SixHatsController {

	@Autowired
	private SixHatsService sixHatsService;
	
	@Autowired
	private HatService hatService;
	
	@Autowired
	private MeetingService	meetingService;
	
	@Autowired
	private SimpMessagingTemplate template;
	

	@GetMapping("/{meetingId}")
	public SixHatsBean findMeeting(@PathVariable("meetingId")Integer meetingId) {
		SixHats res = this.sixHatsService.findById(meetingId);
		if(res.getHats().isEmpty()) {
			
			res = sixHatsService.create(res);

		}
		SixHatsBean result = new SixHatsSerializer().fromSixHats(res);

		return result;
	}
	
	@PostMapping("/{meetingId}")
	public SixHatsBean save(@PathVariable("meetingId") int meetingId, @RequestBody SixHatsBean sixHats) {
		Meeting meeting = sixHatsService.findById(new Integer(meetingId));
		SixHats result = new SixHatsSerializer().fromBean(sixHats, meeting);
		result.setHats(hatService.reassignHats(result));
		sixHatsService.save(result);
		SixHatsBean res =new SixHatsSerializer().fromSixHats(result);
		
		return res;
	}
	
	@MessageMapping("/sixHats/save/{meetingId}")
	public void save(@DestinationVariable int meetingId, ModelBean<SixHatsBean> bean) {
		Meeting meeting = sixHatsService.findById(meetingId);
		SixHats sixHats = new SixHatsSerializer().fromBean(bean.getModel(), meeting);
		sixHats = sixHatsService.save(sixHats);
		
		bean.setModel(new SixHatsSerializer().fromSixHats(sixHats));
		template.convertAndSend("/meeting/" + meetingId, bean);
	}
	
}
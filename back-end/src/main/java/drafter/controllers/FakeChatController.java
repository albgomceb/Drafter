package drafter.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class FakeChatController {
	
	private final SimpMessagingTemplate template;
	
	@Autowired
	public FakeChatController(SimpMessagingTemplate template) {
		this.template = template;
	}
	
	@MessageMapping("/send/msg/{meetingId}")
	public void sendMsg(@DestinationVariable int meetingId, String msg) {
		template.convertAndSend("/meeting/" + meetingId, msg);
	}
}

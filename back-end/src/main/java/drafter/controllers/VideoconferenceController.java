package drafter.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.model.ModelBean;
import drafter.beans.videoconference.Available;
import drafter.beans.videoconference.Candidate;
import drafter.beans.videoconference.Offer;
import drafter.services.MeetingService;
import drafter.services.ParticipantService;
import drafter.services.UserService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/data/meeting")
public class VideoconferenceController extends AbstractController {

	@Autowired
	private MeetingService meetingService;

	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ParticipantService participantService;
	
	@Autowired
	private SimpMessagingTemplate template;
	

	@MessageMapping("/meeting/send-offer/{meetingId}")
	public void offer(@DestinationVariable int meetingId, ModelBean<Offer> data) {
		System.out.println("SEND OFFER CALLED");
		template.convertAndSend("/meeting/" + meetingId, data);
	}
	
	@MessageMapping("/meeting/send-answer/{meetingId}")
	public void answer(@DestinationVariable int meetingId, ModelBean<Offer> data) {
		System.out.println("SEND ANSWER CALLED");
		template.convertAndSend("/meeting/" + meetingId, data);
	}
	
	@MessageMapping("/meeting/send-available/{meetingId}")
	public void available(@DestinationVariable int meetingId, ModelBean<Available> data) {
		System.out.println("SEND AVAILABLE CALLED");
		template.convertAndSend("/meeting/" + meetingId, data);
	}
	
	@MessageMapping("/meeting/send-candidate/{meetingId}")
	public void candidate(@DestinationVariable int meetingId, ModelBean<Candidate> data) {
		System.out.println("SEND CANDIDATE CALLED");
		template.convertAndSend("/meeting/" + meetingId, data);
	}
	
}
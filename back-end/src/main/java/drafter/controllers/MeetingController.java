package drafter.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.meeting.MeetingBean;
import drafter.beans.meeting.MeetingSerializer;
import drafter.domain.Meeting;
import drafter.services.MeetingService;
import drafter.services.StandardService;
import drafter.services.UserService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/data/meeting/standard")
public class MeetingController {

	@Autowired
	private MeetingService meetingService;

	@Autowired
	private StandardService standardService;
	
	@Autowired
	private UserService userService;

	@PostMapping("/")
	public MeetingBean save(@RequestBody MeetingBean meeting) {
		MeetingSerializer serializer =new MeetingSerializer(userService); 
		Meeting result = serializer.fromBean(meeting);
		result = meetingService.create(result);
		MeetingBean res = serializer.fromMeeting(result);
		
		return res;
	}
	
}
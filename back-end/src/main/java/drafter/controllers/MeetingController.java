package drafter.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.meeting.MeetingBean;
import drafter.beans.meeting.MeetingSerializer;
import drafter.beans.user.UserBean;
import drafter.beans.user.UserSerializer;
import drafter.domain.Meeting;
import drafter.domain.User;
import drafter.services.MeetingService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/data/meeting")
public class MeetingController {

	@Autowired
	private MeetingService meetingService;


	@PostMapping("/")
	public String save(@RequestBody MeetingBean meeting) {
//		Meeting result = MeetingSerializer.fromMeeting(meeting);

		return "hola mundo";
	}
	
}
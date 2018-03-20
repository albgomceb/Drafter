package drafter.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.user.UserBean;
import drafter.beans.user.UserSerializer;
import drafter.domain.User;
import drafter.services.MeetingService;

@CrossOrigin
@RestController
@RequestMapping("/data/meeting")
public class MeetingController {

	@Autowired
	private MeetingService meetingService;


	@PostMapping("/")
	public String save(UserBean user) {
		User result = UserSerializer.fromBean(user);
		System.out.println(result);

		return "";
	}

}
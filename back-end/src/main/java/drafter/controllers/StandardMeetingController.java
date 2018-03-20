package drafter.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.domain.Standard;
import drafter.services.StandardMeetingService;

@CrossOrigin
@RestController
@RequestMapping("/data/standard")
public class StandardMeetingController {

	@Autowired
	private StandardMeetingService standardMeetingService;


	@GetMapping("/{id}")
	public String save(@PathVariable(name = "id") Integer meetingId) {
		Standard meeting = standardMeetingService.findById(meetingId);

		return "";
	}

}
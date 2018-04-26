package drafter.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.participant.ParticipantBean;
import drafter.beans.participant.ParticipantSerializer;
import drafter.domain.Participant;
import drafter.services.DepartmentService;
import drafter.services.MeetingService;
import drafter.services.ParticipantService;
import drafter.services.UserService;

@CrossOrigin
@RestController
@RequestMapping("/data/participants")
public class ParticipantController {

	@Autowired
	private ParticipantService participantService;
	
	@Autowired
	private MeetingService meetingService;
	
	@Autowired
	private DepartmentService departmentService;
	
	@Autowired
	private UserService userService;

	@GetMapping("")
	public List<ParticipantBean> findAll() {
		List<Participant> res = this.participantService.findAll();
		ParticipantSerializer participantSerializer=new ParticipantSerializer();
		List<ParticipantBean> result = res.stream().map(part -> participantSerializer.fromParticipant(part)).collect(Collectors.toList());

		return result;
	}
	
	@GetMapping("/{brainId}")
	public ParticipantBean findByMeetingAnd(@PathVariable int brainId) {
		Participant res = this.participantService.findByMeetingAndUser(brainId);
		ParticipantSerializer participantSerializer=new ParticipantSerializer();
		ParticipantBean result = participantSerializer.fromParticipant(res);
		return result;
	}
	
	@PostMapping("")
	public List<ParticipantBean> save(@RequestBody ArrayList<ParticipantBean> participants) {
		List<Participant> result = new ParticipantSerializer().fromBean(participants,meetingService,departmentService,userService);

		result.stream().forEach(i -> {
			participantService.save(i);
		});

		List<ParticipantBean> res = result.stream().map(participant -> new ParticipantSerializer().fromParticipant(participant))
				.collect(Collectors.toList());
		return res;
	}
	

}
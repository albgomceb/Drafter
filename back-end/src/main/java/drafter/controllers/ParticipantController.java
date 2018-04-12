package drafter.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.participant.ParticipantBean;
import drafter.beans.participant.ParticipantSerializer;
import drafter.domain.Participant;
import drafter.services.ParticipantService;

@CrossOrigin
@RestController
@RequestMapping("/data/participants")
public class ParticipantController {

	@Autowired
	private ParticipantService participantService;

	@GetMapping("")
	public List<ParticipantBean> findAll() {
		List<Participant> res = this.participantService.findAll();
		List<ParticipantBean> result = res.stream().map(part -> ParticipantSerializer.fromParticipant(part)).collect(Collectors.toList());

		return result;
	}
	
	@GetMapping("/{brainId}")
	public ParticipantBean findByMeetingAnd(@PathVariable int brainId) {
		Participant res = this.participantService.findByMeetingAndUser(brainId);
		ParticipantBean result = ParticipantSerializer.fromParticipant(res);
		return result;
	}
	

}
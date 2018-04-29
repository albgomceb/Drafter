package drafter.controllers;


import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

import drafter.beans.Option;
import drafter.beans.meeting.MeetingBean;
import drafter.beans.meeting.MeetingSerializer;
import drafter.beans.model.ModelBean;
import drafter.beans.participant.ParticipantBean;
import drafter.beans.participant.ParticipantSerializer;
import drafter.domain.Meeting;
import drafter.domain.Participant;
import drafter.domain.SixHats;
import drafter.domain.User;
import drafter.services.HatService;
import drafter.services.MeetingService;
import drafter.services.ParticipantService;
import drafter.services.SixHatsService;
import drafter.services.StandardService;
import drafter.services.UserService;
import drafter.utilities.Pagination;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/data/meeting")
public class MeetingController extends AbstractController {

	@Autowired
	private MeetingService meetingService;

	@Autowired
	private StandardService standardService;
	
	@Autowired
	private SixHatsService sixHatsService;
	
	@Autowired
	private HatService hatService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ParticipantService participantService;
	
	@Autowired
	private SimpMessagingTemplate template;
	

	@PostMapping("/standard")
	public MeetingBean save(@RequestBody MeetingBean meeting) {
		MeetingSerializer serializer = new MeetingSerializer(); 
		Meeting result = serializer.fromBean(meeting);
		//Falta guardar la relacion con los participantes
		
		
		result = meetingService.save(result);
		participantService.relateWithParticipants(result, meeting.getAttendants());
		if(meeting.getType().equals("six-hats")) {
			SixHats sixHats = sixHatsService.create(result);
			sixHatsService.save(sixHats);
			sixHats.getHats().stream()
								.forEach(hat -> hatService.save(hat));
		}
		MeetingBean res = serializer.fromMeeting(result);
		
		
		return res;
	}
	
	@GetMapping("/standard/{meetingId}")
	public MeetingBean getOneStandard(@PathVariable Integer meetingId) {
		MeetingSerializer serializer = new MeetingSerializer(); 
		Meeting result = meetingService.findById(meetingId);
		
		MeetingBean res = serializer.fromMeeting(result);
		
		return res;
	}
	
	@GetMapping("/{meetingId}")
	public MeetingBean getMeeting(@PathVariable int meetingId) {
		MeetingSerializer serializer = new MeetingSerializer(); 
		Meeting result = meetingService.findById(meetingId);
		
		if(!meetingService.isParticipant(meetingId))
			throw new IllegalStateException();
		
		MeetingBean res = serializer.fromMeeting(result);
		
		return res;
	}
	
	@GetMapping("/list/{userId}/page/{p}")
	public Pagination<MeetingBean> getByUserId(@PathVariable("userId") int userId, @PathVariable("p") int p) {		
		if(!isPrincipal(userId))
			throw new IllegalStateException();
		
		// The first page is 0
		if(p < 0)
			p = 0;
		
		Page<Meeting> page = meetingService.findByUserId(userId, PageRequest.of(p, 5));
		
		// If the selected page does not exist, the first page is returned
		if(page.getNumberOfElements() == 0 && p > 0) {
			p = 0;
			page = meetingService.findByUserId(userId, PageRequest.of(p, 5));
		}
		
		Pagination<MeetingBean> meetingBeanPagination = 
				new Pagination<MeetingBean>(page.getContent().stream()
															 .map(meeting -> new MeetingSerializer().fromMeeting(meeting))
															 .collect(Collectors.toList()),
											p, page.getTotalPages(), page.hasPrevious(), page.hasNext());
		
		return meetingBeanPagination;
	}	

	@GetMapping("/types")
	public List<Option> getTypes() {
		return Arrays.asList(new Option("standard", "Standard meeting"),
				new Option("brainstorming", "Brainstorming meeting"),
				new Option("six-hats", "6-hats meeting"));
	}
	
	
	@MessageMapping("/meeting/finish/{meetingId}")
	public void finish(@DestinationVariable int meetingId, ModelBean<Option> data) {
		Meeting meeting = meetingService.finish(meetingId);
		data.setModel(new Option(meeting.getHasfinished()?"true":"false",""));
		
		template.convertAndSend("/meeting/" + meetingId, data);
	}
	
	@MessageMapping("/meeting/attended/{meetingId}")
	public void attended(@DestinationVariable int meetingId, ModelBean<Option> data) {
		User user = userService.findById(new Integer(data.getModel().getId()));
		Participant updated = meetingService.attended(meetingId,user);
		ModelBean<ParticipantBean> response = new ModelBean<ParticipantBean>();
		response.setModel(new ParticipantSerializer().fromParticipant(updated));
		response.setData(data.getData());
		response.setType(data.getType());
		response.setName(data.getName());
		template.convertAndSend("/meeting/" + meetingId, response);
	}
	@MessageMapping("/meeting/nextStep/{meetingId}")
	public void nextStep(@DestinationVariable int meetingId, ModelBean<Option> data) {
		Meeting meeting = meetingService.nextStep(meetingId);
		data.setModel(new Option(meeting.getStatus()+"",""));
		
		template.convertAndSend("/meeting/" + meetingId, data);
	}
	
	@GetMapping("/isParticipant/{meetingId}")
	public String isParticipant(@PathVariable int meetingId) {
		boolean res;
		try {
			res = meetingService.isParticipant(meetingId);
		} catch(Throwable e) {
			res = false;
		}
		
		return ""+res;
	}
	
	@GetMapping("/setTimer/{meetingId}/{timer}")
	public String nextStep(@PathVariable int meetingId, @PathVariable int timer) {
		meetingService.setTimer(meetingId, timer);
		return "";
	}
	
	private boolean isPrincipal(int userId) {
		return userService.findByPrincipal().equals(userService.findById(new Integer(userId)));	
	}
}
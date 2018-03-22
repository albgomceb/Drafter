package drafter.beans.meeting;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.beans.Option;
import drafter.domain.Agenda;
import drafter.domain.Meeting;
import drafter.domain.Participant;
import drafter.domain.Standard;
import drafter.domain.User;
import drafter.services.MeetingService;
import drafter.services.ParticipantService;
import drafter.services.UserService;

@Service
public class MeetingSerializer {
	
	@Autowired
	public ParticipantService participantService;
	
	@Autowired
	public MeetingService meetingService;
		

	public UserService userService;
	
	public MeetingSerializer(UserService userService2) {
		this.userService = userService2;
	}

	public MeetingSerializer() {
		// TODO Auto-generated constructor stub
	}
	public MeetingBean fromMeeting(Meeting meeting) {
		
		MeetingBean res = new MeetingBean();
		res.setId(meeting.getId());
		res.setTitle(meeting.getTitle());
		res.setDescription(meeting.getDescription());
		
		List<Option> attendants = meeting.getParticipants().stream()
				.map(us -> new Option(new Integer(us.getId()).toString(), us.getUser().getName()))
				.collect(Collectors.toList());
		res.setAttendants(attendants);
		
		List<Agenda> agendas = new ArrayList<Agenda>(meeting.getAgendas());
		
//		res.setAgendas(agendas);
		
		return res;
	}
	
	public Standard fromBean(MeetingBean meetingBean) {
		
		Standard res = new Standard();
		
		res.setTitle(meetingBean.getTitle());
		res.setDescription(meetingBean.getDescription());
		
		List<Participant> attendants = meetingBean.getAttendants()
		.stream()
		.map(att ->{
			return userService.findById(new Integer(att.getId()));
		})
		.map(user -> {
			Participant p = new Participant();
			p.setUser(user);
			p.setHasAttended(true);
			p.setRole("default");
			return p;
			})
		.peek(part -> res.addParticipant(part))
		.collect(Collectors.toList());
		
		return res;
		
	}
	
}

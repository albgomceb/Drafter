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
import drafter.domain.SixHats;
import drafter.domain.Standard;
import drafter.services.MeetingService;
import drafter.services.ParticipantService;
import drafter.services.SixHatsService;
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
		res.setType(meeting.getType()==null?"standard":meeting.getType());
		res.setFinished(meeting.isHasfinished());
		
		List<Option> attendants = meeting.getParticipants().stream()
				.map(us -> new Option(new Integer(us.getId()).toString(), us.getUser().getName()))
				.collect(Collectors.toList());
		res.setAttendants(attendants);
		List<Agenda> agendas = new ArrayList<Agenda>(meeting.getAgendas());
		
//		res.setAgendas(agendas);
		
		return res;
	}
	
	public Meeting fromBean(MeetingBean meetingBean) {
		
		Meeting res = meetingByType(meetingBean.getType());
		res.setTitle(meetingBean.getTitle());
		res.setDescription(meetingBean.getDescription());
		res.setType(meetingBean.getType());
		
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
	
	/**
	 * Dado el tipo en String devuelve una instacia dell objeto que le corresponde
	 * @param type
	 * @return
	 */
	public Meeting meetingByType(String type) {
		switch(type) {
		case "six-hats":
			return new SixHats();
		
		default:
			return new Standard();
			
		}
	}
	/**
	 * Dado un objeto meeting devulve el string identificador correspondiente
	 * @param meeting:
	 * @return
	 */
	public String typeByMeeting(Class<? extends Meeting> clase) {
		if(clase.equals(SixHats.class)) {
			return "six-hats";
		}
		
		return "standard";
	}
	
}

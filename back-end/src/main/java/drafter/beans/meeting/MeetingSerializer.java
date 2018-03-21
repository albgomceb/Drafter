package drafter.beans.meeting;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import drafter.beans.Option;
import drafter.domain.Agenda;
import drafter.domain.Meeting;
import drafter.domain.Participant;
import drafter.domain.Standard;
import drafter.services.ParticipantService;

public class MeetingSerializer {
	
	@Autowired
	public ParticipantService participantService;
	
	public static MeetingBean fromMeeting(Meeting meeting) {
		
		MeetingBean res = new MeetingBean();
		
		res.setTitle(meeting.getTitle());
		res.setDescription(meeting.getDescription());
		
		List<Option> attendants = meeting.getParticipants().stream()
				.map(us -> new Option(new Integer(us.getId()).toString(), us.getUser().getName()))
				.collect(Collectors.toList());
		res.setAttendants(attendants);
		
		List<Agenda> agendas = new ArrayList<Agenda>(meeting.getAgendas());
		
		res.setAgendas(agendas);
		
		return res;
	}
	
	public static Standard fromBean(MeetingBean meetingBean) {
		
		Standard res = new Standard();
		
		res.setTitle(meetingBean.getTitle());
		res.setDescription(meetingBean.getDescription());
//		List<Participant> attendants = meetingBean.getAttendants().stream()
//				.map(us -> this.participantService.)
		
		return res;
		
	}
	
}

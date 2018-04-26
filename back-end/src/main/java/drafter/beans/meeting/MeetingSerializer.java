package drafter.beans.meeting;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.beans.Option;
import drafter.domain.BrainStorming;
import drafter.domain.Meeting;
import drafter.domain.SixHats;
import drafter.domain.Standard;
import drafter.services.MeetingService;
import drafter.services.ParticipantService;
import drafter.services.UserService;

@Service
public class MeetingSerializer {
	
	
	@Autowired
	public ParticipantService participantService;
	
	@Autowired
	public MeetingService meetingService;
		
	@Autowired
	public UserService userService;
	

	public MeetingBean fromMeeting(Meeting meeting) {
		
		MeetingBean res = new MeetingBean();
		res.setId(meeting.getId());
		res.setTitle(meeting.getTitle());
		res.setDescription(meeting.getDescription());
		res.setNumberOfMeeting(meeting.getNumberOfMeeting());
		res.setTimer(meeting.getTimer());
		res.setImage(meeting.getImage());
		res.setDate(meeting.getDate().getTime());
		res.setType(meeting.getType() == null ? "standard" : meeting.getType());
		res.setHasFinished(meeting.getHasfinished());

		res.setStatus(meeting.getStatus());

		
		List<Option> attendants = meeting.getParticipants().stream()
				.map(us -> new Option(new Integer(us.getId()).toString(), us.getUser().getName(),null, us.getUser().getPhoto()!=null ? us.getUser().getPhoto() : "/assets/imag/none.png",us.getRole()))
				.collect(Collectors.toList());
		res.setAttendants(attendants);
		
		return res;
	}
	
	public Meeting fromBean(MeetingBean meetingBean) {
		
		Meeting res = meetingByType(meetingBean.getType());
		res.setTitle(meetingBean.getTitle());
		res.setDescription(meetingBean.getDescription());
		res.setStatus(1);
//		res.setType(meetingBean.getType());
//		
//		List<Participant> attendants = meetingBean.getAttendants()
//		.stream()
//		.map(att ->{
//			return userService.findById(new Integer(att.getId()));
//		})
//		.map(user -> {
//			Participant p = new Participant();
//			p.setUser(user);
//			p.setHasAttended(true);
//			p.setRole("default");
//			return p;
//			})
//		.peek(part -> res.addParticipant(part))
//		.collect(Collectors.toList());
		
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
		case "brainstorming":
			return new BrainStorming();
		
		default:
			return new Standard();
			
		}
	}
	
}

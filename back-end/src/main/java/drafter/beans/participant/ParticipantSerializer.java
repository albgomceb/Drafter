package drafter.beans.participant;

import java.util.ArrayList;
import java.util.List;

import drafter.domain.Department;
import drafter.domain.Meeting;
import drafter.domain.Participant;
import drafter.domain.User;
import drafter.services.DepartmentService;
import drafter.services.MeetingService;
import drafter.services.UserService;

public class ParticipantSerializer {

	public ParticipantBean fromParticipant(Participant participant) {

		ParticipantBean res = new ParticipantBean();

		res.setId(participant.getId());
		res.setHasAttended(participant.isHasAttended());
		res.setRole(participant.getRole());
		res.setUserId(participant.getUser().getId());
		res.setMeetingId(participant.getMeeting().getId());
		res.setDepartmentId(participant.getDepartment().getId());

		return res;
	}
	
	public List<Participant> fromBean(List<ParticipantBean> participantsBean,MeetingService meetingService,DepartmentService departmentService,UserService userService) {
		List<Participant> participants = new ArrayList<Participant>();
		for (ParticipantBean ib : participantsBean) {
			Participant participant = new Participant();
			Meeting meeting= meetingService.findById(ib.getMeetingId());
			Department department = departmentService.findById(ib.getDepartmentId());
			User user= userService.findById(ib.getUserId());
			participant.setId(ib.getId());
			participant.setRole(ib.getRole());
			participant.setHasAttended(ib.isHasAttended());
			participant.setUser(user);
			participant.setDepartment(department);
			participant.setMeeting(meeting);
			meeting.addParticipant(participant);
			
			participant.setRole(ib.getRole());
			
			participants.add(participant);
		}

		return participants;
	}

}

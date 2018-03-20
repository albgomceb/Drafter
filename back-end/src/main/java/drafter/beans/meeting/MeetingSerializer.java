package drafter.beans.meeting;

import drafter.beans.MeetingBean;

import drafter.domain.Meeting;

public class MeetingSerializer {

	
	
	public static MeetingBean fromMeeting(Meeting meeting) {
		
		MeetingBean res = new MeetingBean(); 
		
		res.setTitle(meeting.getTitle());
		res.setDescription(meeting.getDescription());
		res.setNumberOfMeeting(meeting.getNumberOfMeeting());
		res.setDate(meeting.getDate());
		res.setTimer(meeting.getTimer());
	
		return res; 
	}
	
	
	
	
}

package drafter.beans.sixHats;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import drafter.domain.Meeting;
import drafter.domain.SixHats;


public class SixHatsSerializer {
	
	public SixHatsBean fromSixHats(SixHats sixHats) {
		SixHatsBean res = new SixHatsBean();
		List<HatBean> hats = new ArrayList<HatBean>();
		if(sixHats.getHats() != null) 
			hats = sixHats.getHats().stream()
					.map(hat -> new HatSerializer().fromHat(hat))
					.collect(Collectors.toList());
		
		res.setHats(hats);
		res.setMeetingId(sixHats.getId());
		res.setSecondsLeft(getSecondsLeft(sixHats.getRoundTime()));
		
		return res;
	}
	
	public SixHats fromBean(SixHatsBean sixHatsBean, Meeting meeting) {
		SixHats sixHats = new SixHats();
		sixHats.setId(sixHatsBean.getMeetingId());	
		sixHats.setVersion(meeting.getVersion());
		sixHats.setTitle(meeting.getTitle());
		sixHats.setDescription(meeting.getDescription());
		sixHats.setDate(new Date());
		sixHats.setNumberOfMeeting(meeting.getNumberOfMeeting());
		sixHats.setTimer(meeting.getTimer());
		sixHats.setImage(meeting.getImage());
		sixHats.setHasfinished(meeting.getHasfinished());
		sixHats.setSteps(meeting.getSteps());
		sixHats.setAgendas(meeting.getAgendas());
		sixHats.setParticipants(meeting.getParticipants());
		sixHats.setStatus(1);
		if(sixHatsBean.getSecondsLeft() != null)
			sixHats.setRoundTime(getRoundTime(sixHatsBean.getSecondsLeft()));
		
		sixHats.setHats(new HatSerializer().fromBean(sixHatsBean.getHats(), sixHats));
		
		return sixHats;
	}
	
	private Integer getSecondsLeft(Date sixHatsDate) {
		Integer res = null;
		
		if(sixHatsDate != null)
			res = new Integer(Math.round((sixHatsDate.getTime() - new Date().getTime())));
			
		return res;
	}
	
	private Date getRoundTime(int secondsLeft) {
		return new Date(new Date().getTime() + (secondsLeft/1000));
	}
}

package drafter.beans.sixHats;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import drafter.domain.Hat;
import drafter.domain.Meeting;
import drafter.domain.SixHats;


public class SixHatsSerializer {
	
	public SixHatsBean fromSixHats(SixHats sixHats) {
		SixHatsBean res = new SixHatsBean();
		
		List<HatBean> hats = new ArrayList<HatBean>();
		for(Hat hat : sixHats.getHats())
			hats.add(new HatSerializer().fromHat(hat));
		res.setHats(hats);
		res.setMeetingId(sixHats.getId());
		
		return res;
	}
	
	public SixHats fromBean(SixHatsBean sixHatsBean, Meeting meeting) {
		SixHats sixHats = new SixHats();
		sixHats.setHats(new HatSerializer().fromBean(sixHatsBean.getHats()));
		sixHats.setId(sixHatsBean.getMeetingId());
		
		sixHats.setTitle(meeting.getTitle());
		sixHats.setDescription(meeting.getDescription());
		sixHats.setDate(new Date());
		sixHats.setNumberOfMeeting(meeting.getNumberOfMeeting());
		sixHats.setTimer(meeting.getTimer());
		sixHats.setImage(meeting.getImage());
		sixHats.setHasfinished(meeting.isHasfinished());
		sixHats.setSteps(meeting.getSteps());
		sixHats.setAgendas(meeting.getAgendas());
		sixHats.setParticipants(meeting.getParticipants());
		
		return sixHats;
	}
}

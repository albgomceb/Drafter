package drafter.beans.sixHats;

import java.util.ArrayList;
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
		
		return sixHats;
	}
}

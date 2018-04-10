package drafter.beans.sixHats;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import drafter.domain.Hat;
import drafter.domain.SixHats;


public class HatSerializer {
	
	public HatBean fromHat(Hat hat) {
		HatBean res = new HatBean();
		
		res.setId(hat.getId());
		res.setColor(hat.getColor());
		res.setConclussions(hat.getConclusions());
		res.setOrder(hat.getOrden());
		
		return res;
	}
	
	public List<Hat> fromBean(Collection<HatBean> collection, SixHats sixHats) {
		List<Hat> hats = new ArrayList<Hat>();
		for(HatBean hb: collection) {
			Hat hat = new Hat();
			hat.setId(hb.getId());
			hat.setColor(hb.getColor());
			hat.setOrden(hb.getOrder());
			hat.setConclusions(hb.getConclusions());
			hat.setSixHats(sixHats);
			hats.add(hat);
		}
		
		return hats;
	}
}

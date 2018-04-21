package drafter.beans.sixHats;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import drafter.beans.sixHatsConclusion.SixHatsConclusionSerializer;
import drafter.domain.Hat;
import drafter.domain.SixHats;


public class HatSerializer {
	
	public HatBean fromHat(Hat hat) {
		HatBean res = new HatBean();
		
		res.setId(hat.getId());
		res.setVersion(hat.getVersion());
		res.setColor(hat.getColor());
		
		res.setConclusions(new SixHatsConclusionSerializer().fromConclusion(hat));
		res.setOrder(hat.getOrden());
		
		return res;
	}
	
	public List<Hat> fromBean(Collection<HatBean> collection, SixHats sixHats) {
		List<Hat> hats = new ArrayList<Hat>();
		for(HatBean hb: collection) {
			Hat hat = new Hat();
			hat.setId(hb.getId());
			hat.setVersion(hb.getVersion());
			hat.setColor(hb.getColor());
			hat.setOrden(hb.getOrder());
			hat.setHatConclusions(new SixHatsConclusionSerializer().fromBean(hb));
			hat.setSixHats(sixHats);
			hats.add(hat);
		}
		
		return hats;
	}
	
	public Hat fromBean(HatBean hatBean, SixHats sixHats) {
		Hat hat = new Hat();
		hat.setId(hatBean.getId());
		hat.setVersion(hatBean.getVersion());
		hat.setColor(hatBean.getColor());
		hat.setOrden(hatBean.getOrder());
		hat.setHatConclusions(new SixHatsConclusionSerializer().fromBean(hatBean));
		hat.setSixHats(sixHats);
		
		
		return hat;
	}
}

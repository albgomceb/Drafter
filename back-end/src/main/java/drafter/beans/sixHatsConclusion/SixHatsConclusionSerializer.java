
package drafter.beans.sixHatsConclusion;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import drafter.beans.sixHats.HatBean;
import drafter.domain.Hat;

public class SixHatsConclusionSerializer {

	public Collection<SixHatsConclusionBean> fromConclusion(Hat hat) {
		List<SixHatsConclusionBean> res = new ArrayList<SixHatsConclusionBean>();
		List<String> conclusions = new ArrayList<String>(hat.getConclusions());
		SixHatsConclusionBean conclusion = new SixHatsConclusionBean();
		conclusions.stream()
					.forEach(con -> {
						conclusion.setId(conclusions.indexOf(con));
						conclusion.setConclusion(con);
						res.add(conclusion);
					});
//		for(String con : conclusions) {
//			SixHatsConclusionBean conclusion = new SixHatsConclusionBean();
//			conclusion.setId(conclusions.indexOf(con));
//			conclusion.setConclusion(con);
//			res.add(conclusion);
//		}

		return res;
	}

	public Collection<String> fromBean(HatBean hatBean) {
		List<String> res = new ArrayList<String>();
		List<SixHatsConclusionBean> conclusions = new ArrayList<SixHatsConclusionBean>(hatBean.getConclusions());
		
		conclusions.stream()
					.forEach(con -> res.set(con.getId(), con.getConclusion()));

		return res;
	}
}

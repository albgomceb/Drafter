
package drafter.beans.hatConclusion;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import drafter.beans.sixHats.HatBean;
import drafter.domain.Hat;
import drafter.domain.HatConclusion;

public class HatConclusionSerializer {


	public Collection<HatConclusionBean> fromConclusion(Hat hat) {
		List<HatConclusionBean> res = new ArrayList<HatConclusionBean>();
		List<HatConclusion> conclusions = new ArrayList<HatConclusion>(hat.getHatConclusions());
		conclusions.stream()
					.forEach(con -> {
						HatConclusionBean conclusion = new HatConclusionBean();
						conclusion.setId(con.getId());
						conclusion.setVersion(con.getVersion());
						conclusion.setText(con.getText());
						res.add(conclusion);
					});

		return res;
	}
	
	public HatConclusionBean fromConclusion(HatConclusion hatConclusion) {
		HatConclusionBean res = new HatConclusionBean();
		
		res.setId(hatConclusion.getId());
		res.setVersion(hatConclusion.getVersion());
		res.setText(hatConclusion.getText());			

		return res;
	}

	public Collection<HatConclusion> fromBean(HatBean hatBean) {
		List<HatConclusion> res = new ArrayList<HatConclusion>();
		List<HatConclusionBean> conclusions = new ArrayList<HatConclusionBean>(hatBean.getHatConclusions());
		
		conclusions.stream()
					.forEach(con -> {
						HatConclusion conclusion = new HatConclusion();
						conclusion.setId(con.getId());
						conclusion.setVersion(con.getVersion());
						conclusion.setText(con.getText());
						res.add(conclusion);
					});

		return res;
	}
	
	public HatConclusion fromBean(Hat hat, HatConclusionBean con) {
		HatConclusion res = new HatConclusion();
		
		res.setId(con.getId());
		res.setVersion(con.getVersion());
		res.setText(con.getText());		
		res.setHat(hat);

		return res;
	}
}

package drafter.beans.conclusion;

import drafter.beans.ConclusionBean;
import drafter.domain.Conclusion;

public class ConclusionSerializer {

	
	public static ConclusionBean fromConclusion(Conclusion conclusion) {
		
		ConclusionBean res = new ConclusionBean(); 
		res.setConclusion(conclusion.getConclusion());
		return res; 

	}
}

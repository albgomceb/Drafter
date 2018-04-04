package drafter.beans.brainstorming;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.beans.Option;
import drafter.domain.BrainStorming;
import drafter.services.BrainStormingService;

@Service
public class BrainStormingSerializer {

	@Autowired
	public BrainStormingService bsService; 
	
	
	public BrainStormingSerializer() {
		
	}
	
	
	public BrainStormingBean fromBrainStorming(BrainStorming bs) {
		
		BrainStormingBean res = new BrainStormingBean(); 
		res.setTitle(bs.getTitle());
		res.setDate(bs.getDate());
		res.setTimer(bs.getTimer());
		
		List<Option> ideas = bs.getIdeas().stream().map(brains -> new Option(new Integer(brains.getId()).toString(),null))
				.collect(Collectors.toList()); 
		res.setIdeas(ideas);
		
		return res; 
	}
	
	
	
}

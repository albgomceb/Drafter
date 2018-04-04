package drafter.controllers;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.brainstorming.BrainStormingBean;
import drafter.beans.brainstorming.BrainStormingSerializer;
import drafter.beans.idea.IdeaBean;
import drafter.beans.idea.IdeaSerializer;
import drafter.domain.BrainStorming;
import drafter.domain.Idea;
import drafter.services.BrainStormingService;
import drafter.services.IdeaService;

@CrossOrigin
@RestController
@RequestMapping("/data/minutes/")
public class MinuteBSController {

	//Services------------------------------------------------
	@Autowired
	private BrainStormingService bsService; 
	
	@Autowired
	private IdeaService ideaService; 
	
	
	//Constructor------------------------------------------------

	public MinuteBSController() {
		
	}

	
	//Procedure---------------------------------------------------
	
	@GetMapping("/brainstorming/{id}")
	public BrainStormingBean findBrainStorming(@PathVariable("id") int idBS) {
		
		BrainStorming result = bsService.findById(idBS); 
		BrainStormingBean bsbean = new BrainStormingSerializer().fromBrainStorming(result); 
		return bsbean; 
		
		
	}
	
	@GetMapping("/brainstorming/{id}/ideas")
	public List<IdeaBean> findIdeasByBrainStorming(@PathVariable("id") int idBS) {
		
		Collection<Idea> ideas;
		ideas = ideaService.findIdeasByBSId(idBS); 
		IdeaSerializer serializer = new IdeaSerializer(); 
		List<IdeaBean> result = ideas.stream().map(i -> serializer.fromIdea(i))
				.collect(Collectors.toList()); 
		return result; 
		
	}
	
}

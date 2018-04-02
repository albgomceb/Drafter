package drafter.controllers;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import drafter.beans.idea.IdeaBean;
import drafter.beans.idea.IdeaSerializer;
import drafter.domain.BrainStorming;
import drafter.domain.Idea;
import drafter.services.BrainStormingService;
import drafter.services.IdeaService;


@CrossOrigin
@RestController
@RequestMapping("/data/ideas")
public class IdeaController {
	
	@Autowired
	private IdeaService ideaService;
	
	@Autowired
	private BrainStormingService brainStormingService;

	@GetMapping("")
	public List<IdeaBean> findAll() {
		List<Idea> res = this.ideaService.findAll();
		List<IdeaBean> result = res.stream().map(idea -> new IdeaSerializer().fromIdea(idea)).collect(Collectors.toList());

		return result;
	}
	
	@GetMapping("/{ideaId}")
	public IdeaBean findMeeting(@PathVariable("ideaId")Integer ideaId) {
		Idea res = this.ideaService.findById(ideaId);
		IdeaBean result = new IdeaSerializer().fromIdea(res);

		return result;
	}
	
	@PostMapping("/{brainId}")
	public List<IdeaBean> save(@PathVariable("brainId") int meetingId, @RequestBody ArrayList<IdeaBean> ideas) {
		BrainStorming br = brainStormingService.findById(new Integer(meetingId));
		List<Idea> result = new IdeaSerializer().fromBean(ideas, br);
		result.stream().forEach(i -> {
			
			ideaService.save(i);	
		});
		List<IdeaBean> res = result.stream().map(idea -> new IdeaSerializer().fromIdea(idea)).collect(Collectors.toList());
		
		return res;
	}
	
	@GetMapping("/list/{brainId}")
	public List<IdeaBean> findByMeeting(@PathVariable int brainId) {
		List<IdeaBean> res = new LinkedList<IdeaBean>();
		try {
			for(Idea idea : ideaService.findByBrain(brainId))
				res.add(new IdeaSerializer().fromIdea(idea));
		} catch(Throwable e) {
			throw e;
		}

		return res;
	}
}

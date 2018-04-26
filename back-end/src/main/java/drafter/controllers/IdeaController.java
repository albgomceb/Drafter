package drafter.controllers;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.idea.IdeaBean;
import drafter.beans.idea.IdeaSerializer;
import drafter.beans.model.ModelBean;
import drafter.domain.BrainStorming;
import drafter.domain.Idea;
import drafter.services.BrainStormingService;
import drafter.services.ConsService;
import drafter.services.IdeaService;
import drafter.services.ParticipantService;
import drafter.services.ProsService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/data/ideas")
public class IdeaController {

	@Autowired
	private IdeaService ideaService;

	@Autowired
	private BrainStormingService brainStormingService;
	@Autowired
	private ProsService prosService;
	@Autowired
	private ConsService consService;
	@Autowired
	private ParticipantService participantService;

	@Autowired
	private SimpMessagingTemplate template;

	@GetMapping("")
	public List<IdeaBean> findAll() {
		List<Idea> res = this.ideaService.findAll();
		List<IdeaBean> result = res.stream().map(idea -> new IdeaSerializer().fromIdea(idea))
				.collect(Collectors.toList());

		return result;
	}

	@GetMapping("/list/{brainId}")
	public List<IdeaBean> findByMeeting(@PathVariable int brainId) {
		List<IdeaBean> res = new LinkedList<IdeaBean>();
		for (Idea i : ideaService.findByMeeting(brainId))
			res.add(new IdeaSerializer().fromIdea(i));

		return res;
	}

	@PostMapping("/{brainId}")
	public List<IdeaBean> save(@PathVariable("brainId") int brainId, @RequestBody ArrayList<IdeaBean> ideas) {
		BrainStorming brainstorming = brainStormingService.findById(new Integer(brainId));
		List<Idea> result = new IdeaSerializer().fromBean(ideas, brainstorming);
		result.stream().forEach(a -> {

			ideaService.save(a);
			brainstorming.addIdea(a);
			brainStormingService.create(brainstorming);
		});
		List<IdeaBean> res = result.stream().map(idea -> new IdeaSerializer().fromIdea(idea))
				.collect(Collectors.toList());

		return res;
	}
	
	@MessageMapping("/idea/save/{brainId}")
	public void saveOne(@DestinationVariable int brainId, ModelBean<IdeaBean> bean) {
		BrainStorming brainstorming = brainStormingService.findById(brainId);
		Idea idea = new IdeaSerializer().fromBean(bean.getModel(), brainstorming, ideaService, prosService, consService, participantService);
		bean.setModel(ideaService.saveBean(idea));
		
		template.convertAndSend("/meeting/" + brainId, bean);
	}
	
	@MessageMapping("/idea/delete/{ideaId}/{brainId}")
	public void delete(@DestinationVariable int ideaId, @DestinationVariable int brainId, String json) {
		if(ideaId != 0)
			ideaService.delete(ideaId);
		template.convertAndSend("/meeting/" + brainId, json);
	}

	@MessageMapping("/idea/save/{brainId}")
	public void saveOne(@DestinationVariable int brainId, ModelBean<IdeaBean> bean) {
		BrainStorming brainstorming = brainStormingService.findById(new Integer(brainId));
		Idea idea = new IdeaSerializer().fromBean(bean.getModel(), brainstorming, ideaService, prosService, consService,
				participantService);
		bean.setModel(ideaService.saveBean(idea));

		template.convertAndSend("/meeting/" + brainId, bean);
	}

	@MessageMapping("/idea/delete/{ideaId}/{brainId}")
	public void delete(@DestinationVariable int ideaId, @DestinationVariable int brainId, String json) {
		if (ideaId != 0)
			ideaService.delete(ideaId);
		template.convertAndSend("/meeting/" + brainId, json);
	}
}

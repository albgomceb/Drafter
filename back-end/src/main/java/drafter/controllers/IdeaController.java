package drafter.controllers;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.agenda.AgendaBean;
import drafter.beans.agenda.AgendaSerializer;
import drafter.beans.idea.IdeaBean;
import drafter.beans.idea.IdeaSerializer;
import drafter.domain.Agenda;
import drafter.domain.Idea;
import drafter.services.IdeaService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/data/ideas")
public class IdeaController {
	
	@Autowired
	private IdeaService ideaService;

	@GetMapping("")
	public List<IdeaBean> findAll() {
		List<Idea> res = this.ideaService.findAll();
		List<IdeaBean> result = res.stream().map(idea -> new IdeaSerializer().fromIdea(idea)).collect(Collectors.toList());

		return result;
	}
	
	@GetMapping("/list/{meetingId}")
	public List<IdeaBean> findByMeeting(@PathVariable int brainId) {
		List<IdeaBean> res = new LinkedList<IdeaBean>();
		try {
			for(Idea i : ideaService.findByMeeting(brainId))
				res.add(new IdeaSerializer().fromIdea(i));
		} catch(Throwable e) {
			throw e;
		}

		return res;
	}

}

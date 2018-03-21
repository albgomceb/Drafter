package drafter.controllers;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.conclusion.ConclusionBean;
import drafter.beans.conclusion.ConclusionSerializer;
import drafter.domain.Conclusion;
import drafter.services.ConclusionService;

@CrossOrigin
@RestController
@RequestMapping("/data/conclusion")
public class ConclusionController {

	@Autowired
	private ConclusionService conclusionService;


	@GetMapping("/list/{agendaId}")
	public List<ConclusionBean> save(@PathVariable int agendaId) {
		List<ConclusionBean> res = new LinkedList<ConclusionBean>();
		try {
			for(Conclusion c : conclusionService.findByAgenda(agendaId))
				res.add(ConclusionSerializer.fromConclusion(c));
		} catch(Throwable e) {
			throw e;
		}
		
		return res;
	}

}
package drafter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.domain.Conclusion;
import drafter.services.ConclusionService;

@CrossOrigin
@RestController
@RequestMapping("/data/conclusion")
public class ConclusionController {

	@Autowired
	private ConclusionService conclusionService;


	@GetMapping("/list/{agendaId}")
	public List<Conclusion> save(@PathVariable int agendaId) {
		List<Conclusion> res = null;
		try {
			res = conclusionService.findByAgenda(agendaId);
		} catch(Throwable e) {
			throw e;
		}
		
		return res;
	}

}
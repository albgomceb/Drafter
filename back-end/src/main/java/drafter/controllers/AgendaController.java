package drafter.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.agenda.AgendaBean;
import drafter.beans.agenda.AgendaSerializer;
import drafter.domain.Agenda;
import drafter.services.AgendaService;

@CrossOrigin
@RestController
@RequestMapping("/data/agendas")
public class AgendaController {

	@Autowired
	private AgendaService agendaService;

	@GetMapping("")
	public List<AgendaBean> findAll() {
		List<Agenda> res = this.agendaService.findAll();
		List<AgendaBean> result = res.stream().map(agenda -> AgendaSerializer.fromAgenda(agenda)).collect(Collectors.toList());

		return result;
	}

	@PostMapping("/")
	public String save(AgendaBean agenda) {
		Agenda result = AgendaSerializer.fromBean(agenda);
		System.out.println(result);

		return "";
	}

}
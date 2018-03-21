package drafter.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.agenda.AgendaBean;
import drafter.beans.agenda.AgendaSerializer;
import drafter.domain.Agenda;
import drafter.services.AgendaService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
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

	@PostMapping("/{id}")
	public String save(@RequestBody ArrayList<AgendaBean> agendas) {
//		List<Agenda> result = AgendaSerializer.fromBean(agendas);

		return "Aquí se devuelve el JSON con los objetos que se han guardado en back-end";
	}

}
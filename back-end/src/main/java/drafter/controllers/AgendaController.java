package drafter.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.websocket.server.PathParam;

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
import drafter.domain.Meeting;
import drafter.repositories.MeetingRepository;
import drafter.services.AgendaService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/data/agendas")
public class AgendaController {

	@Autowired
	private AgendaService agendaService;
	
	@Autowired
	private MeetingRepository	meetingRepository;

	@GetMapping("")
	public List<AgendaBean> findAll() {
		List<Agenda> res = this.agendaService.findAll();
		List<AgendaBean> result = res.stream().map(agenda -> new AgendaSerializer().fromAgenda(agenda)).collect(Collectors.toList());

		return result;
	}

	@PostMapping("/{idMeeting}")
	public List<Agenda> save(@PathParam("idMeeting") Integer meetingId, @RequestBody ArrayList<AgendaBean> agendas) {
		Meeting meeting = meetingRepository.findById(meetingId).orElse(null);
		List<Agenda> result = new AgendaSerializer().fromBean(agendas, meeting);

		return result;
	}

}
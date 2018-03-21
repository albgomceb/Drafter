package drafter.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.agenda.AgendaBean;
import drafter.beans.agenda.AgendaSerializer;
import drafter.domain.Agenda;
import drafter.domain.Meeting;
import drafter.services.AgendaService;
import drafter.services.MeetingService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/data/agendas")
public class AgendaController {

	@Autowired
	private AgendaService agendaService;
	
	@Autowired
	private MeetingService	meetingService;
	
	
	@GetMapping("")
	public List<AgendaBean> findAll() {
		List<Agenda> res = this.agendaService.findAll();
		List<AgendaBean> result = res.stream().map(agenda -> new AgendaSerializer().fromAgenda(agenda)).collect(Collectors.toList());

		return result;
	}

	@GetMapping("/{agendaId}")
	public AgendaBean findMeeting(@PathParam("id")Integer agendaId) {
		Agenda res = this.agendaService.findById(agendaId);
		AgendaBean result = new AgendaSerializer().fromAgenda(res);

		return result;
	}
	
	
	@PostMapping("/{meetingId}")
	public List<Agenda> save(@PathVariable("meetingId") int meetingId, @RequestBody ArrayList<AgendaBean> agendas) {
		Meeting meeting = meetingService.findById(new Integer(meetingId));
		List<Agenda> result = new AgendaSerializer().fromBean(agendas, meeting);
		result.stream().forEach(a -> {
			
			agendaService.save(a);	
		});

		
		return result;
	}

}
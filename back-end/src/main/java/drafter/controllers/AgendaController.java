
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

import drafter.beans.agenda.AgendaBean;
import drafter.beans.agenda.AgendaSerializer;
import drafter.domain.Agenda;
import drafter.domain.Meeting;
import drafter.services.AgendaService;
import drafter.services.MeetingService;
import drafter.services.StandardService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/data/agendas")
public class AgendaController {

	@Autowired
	private AgendaService agendaService;
	
	@Autowired
	private MeetingService	meetingService;
	
	@Autowired
	private StandardService	standardService;
	
	
	@GetMapping("")
	public List<AgendaBean> findAll() {
		List<Agenda> res = this.agendaService.findAll();
		List<AgendaBean> result = res.stream().map(agenda -> new AgendaSerializer().fromAgenda(agenda)).collect(Collectors.toList());

		return result;
	}

	@GetMapping("/{agendaId}")
	public AgendaBean findMeeting(@PathVariable("agendaId")Integer agendaId) {
		Agenda res = this.agendaService.findById(agendaId);
		AgendaBean result = new AgendaSerializer().fromAgenda(res);

		return result;
	}
	
	
	@PostMapping("/{meetingId}")
	public List<AgendaBean> save(@PathVariable("meetingId") int meetingId, @RequestBody ArrayList<AgendaBean> agendas) {
		Meeting meeting = standardService.findById(new Integer(meetingId));
		List<Agenda> result = new AgendaSerializer().fromBean(agendas, meeting);
		result.stream().forEach(a -> {
			
			agendaService.save(a);	
		});
		List<AgendaBean> res = result.stream().map(agenda -> new AgendaSerializer().fromAgenda(agenda)).collect(Collectors.toList());
		
		return res;
	}
	
	@GetMapping("/list/{meetingId}")
	public List<AgendaBean> findByMeeting(@PathVariable int meetingId) {
		List<AgendaBean> res = new LinkedList<AgendaBean>();
		try {
			for(Agenda a : agendaService.findByMeeting(meetingId))
				res.add(new AgendaSerializer().fromAgenda(a));
		} catch(Throwable e) {
			throw e;
		}

		return res;
	}

}
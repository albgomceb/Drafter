package drafter.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.AgendaBean;
import drafter.beans.ConclusionBean;
import drafter.beans.MeetingBean;
import drafter.beans.agenda.AgendaSerializer;
import drafter.beans.conclusion.ConclusionSerializer;
import drafter.beans.meeting.MeetingSerializer;
import drafter.domain.Agenda;
import drafter.domain.Conclusion;
import drafter.domain.Meeting;
import drafter.services.AgendaService;
import drafter.services.ConclusionService;
import drafter.services.MeetingService;

@CrossOrigin
@RestController
@RequestMapping({"minutes"})
public class ProcedureMinutesController {
	
	
	//Services------------------------------------------------
	@Autowired
	private MeetingService meetingService;
	
	@Autowired
	private AgendaService agendaService;
	
	
	@Autowired 
	private ConclusionService conclusionService; 
	
	//Constructor------------------------------------------------
	public ProcedureMinutesController() {
		
	}
	
	//Procedure---------------------------------------------------
	@RequestMapping(value="/meeting", produces = {"aplicaction/json"}, method = RequestMethod.GET)
	public MeetingBean findMeeting(int idM) {    // con el id de la reunion saco la informacion necesaria de la reunion. 
		
		Meeting result = meetingService.findOne(idM); 
		MeetingBean mbean = MeetingSerializer.fromMeeting(result); 
		return mbean; 
		
	}
	
	@RequestMapping(value="/agenda", produces  = {"aplication/json"}, method = RequestMethod.GET)
	public List<AgendaBean> findAgenda(int idM){
		
		Meeting meet = meetingService.findOne(idM); 
		List<AgendaBean> result = meet.getAgendas().stream()
				.map(a -> AgendaSerializer.fromAgenda(a))
				.collect(Collectors.toList()); 
		return result; 
		
	}
	
	
	@RequestMapping(value="/conclusion", produces = {"aplication/json"}, method = RequestMethod.GET)
	public List<ConclusionBean> findConclusion(int idM){
		
		
		Meeting meet = meetingService.findOne(idM); 
		List<Agenda> agendas = new ArrayList<Agenda>(meet.getAgendas());
		List<ConclusionBean> result = new ArrayList<ConclusionBean>(); 
		
		for(Agenda a: agendas) {
			for(Conclusion c: a.getConclusion()) {
				
				ConclusionBean cb = ConclusionSerializer.fromConclusion(c); 
				result.add(cb); 
				
			}
			
		}
		
		return result; 
		
	}
	
	

	
	
	
	
	
}

package drafter.controllers;

import java.util.ArrayList;
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
import drafter.beans.conclusion.ConclusionBean;
import drafter.beans.conclusion.ConclusionSerializer;
import drafter.beans.idea.IdeaBean;
import drafter.beans.idea.IdeaSerializer;
import drafter.beans.meeting.MeetingBean;
import drafter.beans.meeting.MeetingSerializer;
import drafter.domain.Agenda;
import drafter.domain.BrainStorming;
import drafter.domain.Conclusion;
import drafter.domain.Meeting;
import drafter.services.BrainStormingService;
import drafter.services.MeetingService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/data/minutes")
public class ProcedureMinutesController {
	
	
	//Services------------------------------------------------
	@Autowired
	private MeetingService meetingService;
	
	@Autowired
	private BrainStormingService brainStormingService;
	
	/*@Autowired
	private AgendaService agendaService;
	
	
	@Autowired 
	private ConclusionService conclusionService;*/ 
	
	//Constructor------------------------------------------------
	public ProcedureMinutesController() {
		
	}
	
	//Procedure---------------------------------------------------
//	@RequestMapping(value="/meeting", produces = {"aplicaction/json"}, method = RequestMethod.GET)
	@GetMapping("/meeting/{id}")
	public MeetingBean findMeeting(@PathVariable("id") int idM) {    // con el id de la reunion saco la informacion necesaria de la reunion. 
		
		Meeting result = meetingService.findById(idM); 
		MeetingBean mbean = new MeetingSerializer().fromMeeting(result); 
		return mbean; 
		
	}
	
	@GetMapping("/meeting")
	public String findsdsd() {    // con el id de la reunion saco la informacion necesaria de la reunion. 
		
		
		return "hola"; 
		
	}
	
//	@RequestMapping(value="/agenda", produces  = {"aplication/json"}, method = RequestMethod.GET)
	@GetMapping("/meeting/{id}/agenda")
	public List<AgendaBean> findAgenda(@PathVariable("id")int idM){
		
		Meeting meet = meetingService.findById(idM); 
		AgendaSerializer serializer =new AgendaSerializer(); 
		List<AgendaBean> result = meet.getAgendas().stream()
				.map(a -> serializer.fromAgenda(a))
				.collect(Collectors.toList()); 
		return result; 
		
	}
	
//	@RequestMapping(value="/conclusion", produces = {"aplication/json"}, method = RequestMethod.GET)
	@GetMapping("/meeting/{id}/conclussions")
	public List<ConclusionBean> findConclusion(@PathVariable("id")int idM){
		
		Meeting meet = meetingService.findById(idM); 
		List<Agenda> agendas = new ArrayList<Agenda>(meet.getAgendas());
		List<ConclusionBean> result = new ArrayList<ConclusionBean>(); 
		
		for(Agenda a: agendas) {
			for(Conclusion c: a.getConclusion()) {
				
				ConclusionBean cb = new ConclusionSerializer().fromConclusion(c); 
				result.add(cb); 
				
			}
			
		}
		
		return result; 
		
	}
	
//	@RequestMapping(value="/ideas", produces  = {"aplication/json"}, method = RequestMethod.GET)
	@GetMapping("/meeting/{id}/ideas")
	public List<IdeaBean> findIdeas(@PathVariable("id")int idM){
		
		BrainStorming bs = brainStormingService.findById(idM); 
		IdeaSerializer serializer = new IdeaSerializer(); 
		List<IdeaBean> result = bs.getIdeas().stream()
				.map(a -> serializer.fromIdea(a))
				.collect(Collectors.toList()); 
		return result; 
		
	}
	
	
}

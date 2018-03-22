package drafter.beans.agenda;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import drafter.beans.conclusion.ConclusionBean;
import drafter.beans.conclusion.ConclusionSerializer;
import drafter.domain.Agenda;
import drafter.domain.Conclusion;
import drafter.domain.Meeting;
import drafter.services.AgendaService;


public class AgendaSerializer {
	
	public AgendaBean fromAgenda(Agenda agenda) {
		AgendaBean res = new AgendaBean();
		
		List<ConclusionBean> conclusion = new LinkedList<ConclusionBean>();
		for(Conclusion c : agenda.getConclusion())
			conclusion.add(new ConclusionSerializer().fromConclusion(c));
		res.setConclusions(conclusion);
		
		res.setId(agenda.getId());
		res.setMeetingId(agenda.getMeeting().getId());
		res.setNumber(agenda.getNumber());
		res.setDescription(agenda.getDescription());
		
		return res;
	}
	
	public List<Agenda> fromBean(List<AgendaBean> agendasBean, Meeting meeting) {
		List<Agenda> agendas = new ArrayList<Agenda>();
		
		for(AgendaBean ab: agendasBean) {
			Agenda a = new Agenda();
			a.setNumber(ab.getNumber());
			a.setDescription(ab.getDescription());
			a.setMeeting(meeting);
			a.setConclusion(new ArrayList<Conclusion>());
			meeting.addAgenda(a);
			agendas.add(a);
		}
		
		return agendas;
	}
}

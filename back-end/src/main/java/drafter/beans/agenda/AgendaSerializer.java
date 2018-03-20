package drafter.beans.agenda;

import java.util.List;
import java.util.stream.Collectors;

import drafter.beans.Option;
import drafter.domain.Agenda;

public class AgendaSerializer {
	
	public static AgendaBean fromAgenda(Agenda agenda) {
		AgendaBean res = new AgendaBean();
		
		List<Option> conclusion = agenda.getConclusion().stream().map(us -> new Option(new Integer(us.getId()).toString(),us.getConclusion())).collect(Collectors.toList()); 
		res.setConclusion(conclusion);
		
		res.setMeeting(res.getMeeting());
		res.setNumber(res.getNumber());
		res.setDescription(res.getDescription());
		
		return res;
	}
	
	public static Agenda fromBean(AgendaBean agenda) {
		return null;
	}
}

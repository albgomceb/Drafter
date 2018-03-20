package drafter.beans.agenda;

import drafter.beans.AgendaBean;
import drafter.domain.Agenda;

public class AgendaSerializer {

	public static AgendaBean fromAgenda(Agenda agenda) {
		
		AgendaBean res = new AgendaBean(); 
		
		res.setNumber(agenda.getNumber());
		res.setDescription(agenda.getDescription());
		
		return res; 
		
	}

}

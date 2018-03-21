package drafter.beans.meeting;

import java.util.List;

import drafter.beans.Option;
import drafter.domain.Agenda;

public class MeetingBean {

	public String title; 
	public String description; 
	public List<Option> attendants;
	public List<Agenda> agendas;
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public List<Option> getAttendants() {
		return attendants;
	}
	public void setAttendants(List<Option> attendants) {
		this.attendants = attendants;
	}
	public List<Agenda> getAgendas() {
		return agendas;
	}
	public void setAgendas(List<Agenda> agendas) {
		this.agendas = agendas;
	}
	
	
	
	
}
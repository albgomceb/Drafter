package drafter.beans.meeting;

import java.util.List;

import drafter.beans.Option;
import drafter.domain.Agenda;

public class MeetingBean {
	public Integer id;
	public String title; 
	public String description; 
	public List<Option> attendants;
	public List<Option> agendas;

	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
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
	public List<Option> getAgendas() {
		return agendas;
	}
	public void setAgendas(List<Option> agendas) {
		this.agendas = agendas;
	}
	
	
}
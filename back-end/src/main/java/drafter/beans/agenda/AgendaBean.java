package drafter.beans.agenda;

import java.util.Collection;

import drafter.beans.Option;
import drafter.domain.Meeting;

public class AgendaBean {

	private int number;
	private String description;
	private Meeting meeting;
	private Collection<Option> conclusion;
	
	
	public int getNumber() {
		return number;
	}
	public void setNumber(int number) {
		this.number = number;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Meeting getMeeting() {
		return meeting;
	}
	public void setMeeting(Meeting meeting) {
		this.meeting = meeting;
	}
	public Collection<Option> getConclusion() {
		return conclusion;
	}
	public void setConclusion(Collection<Option> conclusion) {
		this.conclusion = conclusion;
	}
	
	
	
}

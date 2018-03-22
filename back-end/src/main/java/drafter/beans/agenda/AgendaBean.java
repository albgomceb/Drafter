package drafter.beans.agenda;

import java.util.Collection;

import drafter.beans.Option;

public class AgendaBean {

	private int number;
	private String description;
	private int meetingId;
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
	public int getMeetingId() {
		return meetingId;
	}
	public void setMeetingId(int meetingId) {
		this.meetingId = meetingId;
	}
	public Collection<Option> getConclusion() {
		return conclusion;
	}
	public void setConclusion(Collection<Option> conclusion) {
		this.conclusion = conclusion;
	}
	
	
	
}

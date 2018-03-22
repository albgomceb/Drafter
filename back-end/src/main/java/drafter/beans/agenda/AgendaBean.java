package drafter.beans.agenda;

import java.util.Collection;

import drafter.beans.conclusion.ConclusionBean;

public class AgendaBean {

	private int id;
	private int number;
	private String description;
	private int meetingId;
	private Collection<ConclusionBean> conclusions;
	
	
	public Collection<ConclusionBean> getConclusions() {
		return conclusions;
	}
	public void setConclusions(Collection<ConclusionBean> conclusions) {
		this.conclusions = conclusions;
	}
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
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	
	
}

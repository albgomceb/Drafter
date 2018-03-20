package drafter.beans;

import java.util.Date;
import java.util.List;

public class MeetingBean {

	
	public String title; 
	public String description;
	public Date date;
	public Integer numberOfMeeting;
	public Date timer;
	public List<Option> agendas;
	
	public MeetingBean() {
		
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

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Integer getNumberOfMeeting() {
		return numberOfMeeting;
	}

	public void setNumberOfMeeting(Integer numberOfMeeting) {
		this.numberOfMeeting = numberOfMeeting;
	}

	public Date getTimer() {
		return timer;
	}

	public void setTimer(Date timer) {
		this.timer = timer;
	}

	public List<Option> getAgendas() {
		return agendas;
	}

	public void setAgendas(List<Option> agendas) {
		this.agendas = agendas;
	}
	
	
	

}

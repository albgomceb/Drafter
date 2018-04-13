package drafter.beans.participant;

import java.util.List;

import drafter.beans.Option;

public class ParticipantBean {

	public int id;
	public String role; 
	public boolean hasAttended; 
	public int userId;
	public int meetingId;
	public List<Option> departments;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getMeetingId() {
		return meetingId;
	}
	public void setMeetingId(int meetingId) {
		this.meetingId = meetingId;
	}
	public boolean isHasAttended() {
		return hasAttended;
	}
	public void setHasAttended(boolean hasAttended) {
		this.hasAttended = hasAttended;
	}
	
	public List<Option> getDepartments() {
		return departments;
	}
	public void setDepartments(List<Option> departments) {
		this.departments = departments;
	}
	
	
	
	
}

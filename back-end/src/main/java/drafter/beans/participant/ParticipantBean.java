package drafter.beans.participant;

import java.util.List;

import drafter.beans.Option;

public class ParticipantBean {

	public String role; 
	public boolean hasAttended; 
	public Option user;
	public List<Option> departments;
	
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public boolean isHasAttended() {
		return hasAttended;
	}
	public void setHasAttended(boolean hasAttended) {
		this.hasAttended = hasAttended;
	}
	public Option getUser() {
		return user;
	}
	public void setUser(Option user) {
		this.user = user;
	}
	public List<Option> getDepartments() {
		return departments;
	}
	public void setDepartments(List<Option> departments) {
		this.departments = departments;
	}
	
	
	
}

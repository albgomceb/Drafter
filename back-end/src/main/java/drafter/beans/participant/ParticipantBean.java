package drafter.beans.participant;

public class ParticipantBean {

	public int id;
	public String role; 
	public boolean hasAttended; 
	public int userId;
	public int meetingId;
	public int departmentId;
	
	
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
	public int getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(int departmentId) {
		this.departmentId = departmentId;
	}
	
	
}

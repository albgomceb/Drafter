package drafter.domain;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.SafeHtml;

@Entity
@Access(AccessType.PROPERTY)
public class Participant extends DomainEntity{

	//Atributes------------------------------------------
	
	private String role; 
	private boolean hasAttended; 
	private Boolean showNotification;
	
	
	//Constructor----------------------------------------
	public Participant() {
		
	}
	
	//Methods--------------------------------------------
	
	@NotBlank
	@SafeHtml
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

	public Boolean getShowNotification() {
		return showNotification;
	}

	public void setShowNotification(Boolean showNotification) {
		this.showNotification = showNotification;
	}
	
	// Relationships-------------------------------------
	private Department department; 
	private User user; 
	private Meeting meeting; 
	
	@Valid
	@ManyToOne(optional = true)
	public Department getDepartment() {
		return department;
	}

	
	public void setDepartment(Department department) {
		this.department = department;
	}
	
	@NotNull
	@Valid
	@ManyToOne(optional = false)
	public Meeting getMeeting() {
		return meeting;
	}

	public void setMeeting(Meeting meeting) {
		this.meeting = meeting;
	}

	
	@NotNull
	@Valid
	@ManyToOne(optional = false)
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
}

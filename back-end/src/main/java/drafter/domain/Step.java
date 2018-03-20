package drafter.domain;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.SafeHtml;
import org.hibernate.validator.constraints.URL;

@Entity
@Access(AccessType.PROPERTY)
public class Step extends DomainEntity{

	//Atributes------------------------------------------
	
	private int number; 
	private String description; 
	private String picture; 
	
	
	
	//Constructor----------------------------------------
		
	public Step() {

	}


	//Methods--------------------------------------------
			
	@Min(1)
	public int getNumber() {
		return number;
	}




	public void setNumber(int number) {
		this.number = number;
	}



	@SafeHtml
	@NotBlank
	public String getDescription() {
		return description;
	}




	public void setDescription(String description) {
		this.description = description;
	}



	@Lob
	@SafeHtml
	@URL
	public String getPicture() {
		return picture;
	}




	public void setPicture(String picture) {
		this.picture = picture;
	}

	// Relationships-------------------------------------
	


	private Meeting meeting; 
	
	@Valid
	@NotNull
	@ManyToOne(optional = false)
	public Meeting getMeeting() {
		return meeting;
	}


	public void setMeeting(Meeting meeting) {
		this.meeting = meeting;
	}
	
	
	
	
}

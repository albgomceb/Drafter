package drafter.domain;

import java.util.Collection;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.SafeHtml;

@Entity
@Access(AccessType.PROPERTY)
public class Agenda extends DomainEntity{
	
	//Atributes------------------------------------------
	
	private int number; 
	private String description; 
	
	
	//Constructor----------------------------------------
	public Agenda() {
		
	}
	
	//Methods--------------------------------------------
	
	@Min(1)
	public int getNumber() {
		return number;
	}


	public void setNumber(int number) {
		this.number = number;
	}

	@NotBlank
	@SafeHtml
	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}
	// Relationships-------------------------------------
	
	

	private Meeting meet; 
	private Collection<Conclusion> conclusion; 
	
	@NotNull
	@Valid
	@ManyToOne(optional = false)
	public Meeting getMeet() {
		return meet;
	}
	
	
	
	public void setMeet(Meeting meet) {
		this.meet = meet;
	}
	
	
	@NotNull
	@Valid
	@OneToMany(mappedBy = "agenda")
	public Collection<Conclusion> getConclusion() {
		return conclusion;
	}
	
	
	
	public void setConclusion(Collection<Conclusion> conclusion) {
		this.conclusion = conclusion;
	}
	
	
}

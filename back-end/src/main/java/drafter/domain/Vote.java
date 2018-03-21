package drafter.domain;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Range;

@Entity
@Access(AccessType.PROPERTY)
public class Vote extends DomainEntity{
	
	
	//Atributes------------------------------------------
	
	private int value; 
	
	//Constructor----------------------------------------
	
	public Vote() {
		
	}

	//Methods--------------------------------------------
		
	@Range(min=1, max=10)
	public int getValue() {
		return value;
	}

	public void setValue(int value) {
		this.value = value;
	}

	
	
	// Relationships-------------------------------------



	private Participant participant; 
	private Idea idea; 
	
	@Valid
	@NotNull
	@ManyToOne(optional = false)
	public Participant getParticipant() {
		return participant;
	}

	public void setParticipant(Participant participant) {
		this.participant = participant;
	}


	@Valid
	@NotNull
	@ManyToOne(optional = false)
	public Idea getIdea() {
		return idea;
	}

	public void setIdea(Idea idea) {
		this.idea = idea;
	}
	
	
}

package drafter.domain;

import java.util.Collection;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Entity
@Access(AccessType.PROPERTY)
public class BadPoint extends DomainEntity{

	
	//Atributes------------------------------------------
	private String badpoint; 
	
	//Constructor----------------------------------------
	public BadPoint() {
		
	}

	//Methods--------------------------------------------
	
	
	public String getBadpoint() {
		return badpoint;
	}

	public void setBadpoint(String badpoint) {
		this.badpoint = badpoint;
	}

	
	
	// Relationships-------------------------------------
	
	private Retrospective retroB; 
	private Collection<BadPoint> corrections; 
	
	@Valid 
	@NotNull
	@ManyToOne(optional = true)
	public Retrospective getRetroB() {
		return retroB;
	}

	public void setRetroB(Retrospective retroB) {
		this.retroB = retroB;
	}

	
	@Valid
	@NotNull
	@OneToMany(mappedBy="bpoint")
	public Collection<BadPoint> getCorrections() {
		return corrections;
	}
	
	
	public void setCorrections(Collection<BadPoint> corrections) {
		this.corrections = corrections;
	}
	
	
	
}

package drafter.domain;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Entity
@Access(AccessType.PROPERTY)
public class Correction extends DomainEntity{

	
	//Atributes------------------------------------------
	
	private String correction; 
	
	//Constructor----------------------------------------
	public Correction() {
		
	}

	//Methods--------------------------------------------
	
	
	public String getCorrection() {
		return correction;
	}

	public void setCorrection(String correction) {
		this.correction = correction;
	}

	
	// Relationships-------------------------------------

	private BadPoint bpoint; 
	
	@Valid
	@NotNull
	@ManyToOne(optional = true)
	public BadPoint getBpoint() {
		return bpoint;
	}

	public void setBpoint(BadPoint bpoint) {
		this.bpoint = bpoint;
	}

	
	
	
	
}

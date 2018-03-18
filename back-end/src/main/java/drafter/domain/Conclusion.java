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
public class Conclusion extends DomainEntity{

	//Atributes------------------------------------------
	private String conclusion; 
	
	
	
	
	//Constructor----------------------------------------
	public Conclusion() {
		
	}




	//Methods--------------------------------------------
	@NotBlank
	@SafeHtml
	public String getConclusion() {
		return conclusion;
	}


	public void setConclusion(String conclusion) {
		this.conclusion = conclusion;
	}

	
	// Relationships-------------------------------------
	


	private Agenda agenda; 
	
	@NotNull
	@Valid
	@ManyToOne(optional = false)
	public Agenda getAgenda() {
		return agenda;
	}


	public void setAgenda(Agenda agenda) {
		this.agenda = agenda;
	}
	
}

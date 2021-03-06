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

@Entity
@Access(AccessType.PROPERTY)
public class Cons extends DomainEntity{

	//Atributes------------------------------------------
	
	private int numberCons; 
	private String cons; 
	
	

	//Constructor----------------------------------------
	public Cons() {
		
	}



	//Methods--------------------------------------------
	
	@Min(1)
	public int getNumberCons() {
		return numberCons;
	}




	public void setNumberCons(int numberCons) {
		this.numberCons = numberCons;
	}



	@SafeHtml
	@NotBlank
	@Lob
	public String getCons() {
		return cons;
	}




	public void setCons(String cons) {
		this.cons = cons;
	}

	
	
	// Relationships-------------------------------------
	
	
	private Idea idea; 
	
	@Valid
	@NotNull
	@ManyToOne(optional = true)
	public Idea getIdea() {
		return idea;
	}



	public void setIdea(Idea idea) {
		this.idea = idea;
	}



	
	
	
	
	
	
}

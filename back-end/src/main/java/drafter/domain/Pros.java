package drafter.domain;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.SafeHtml;

@Entity
@Access(AccessType.PROPERTY)
public class Pros extends DomainEntity{

	
	//Atributes------------------------------------------
	
	private int numberPros; 
	private String pros; 
	
	
	public Pros() {
		
	}

	//Constructor----------------------------------------
	@Min(1)
	public int getNumberPros() {
		return numberPros;
	}

	//Methods--------------------------------------------
	
	
	public void setNumberPros(int number) {
		this.numberPros = number;
	}

	@SafeHtml
	@NotBlank
	public String getPros() {
		return pros;
	}


	public void setPros(String pros) {
		this.pros = pros;
	}

	
	
	// Relationships-------------------------------------
	
	private Idea ideaP; 
	
	@Valid
	@NotNull
	@ManyToOne(optional = true)
	public Idea getIdea() {
		return ideaP;
	}



	public void setIdea(Idea ideaP) {
		this.ideaP = ideaP;
	}
}

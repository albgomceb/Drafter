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
	
	private Idea idea; 
	
	@Valid
	@NotNull
	@ManyToOne(optional = true)
	public Idea getIdea() {
		return idea;
	}



<<<<<<< HEAD
	public void setIdea(Idea ideaP) {
		this.idea = ideaP;
=======
	public void setIdea(Idea idea) {
		this.idea = idea;
>>>>>>> 97e5496b96e555bc681cc3afd3da0ac9b7bca977
	}
}

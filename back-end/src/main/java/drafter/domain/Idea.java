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
public class Idea extends DomainEntity{

	//Atributes------------------------------------------
	
	private int number; 
	private String text; 
	private Integer ratingCount; 
	private Integer ratingSum; 
	
	
	//Constructor----------------------------------------
	public Idea() {
		
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
	public String getText() {
		return text;
	}


	public void setText(String text) {
		this.text = text;
	}

	@Min(0)
	public Integer getRatingCount() {
		return ratingCount;
	}


	public void setRatingCount(Integer ratingCount) {
		this.ratingCount = ratingCount;
	}

	@Min(0)
	public Integer getRatingSum() {
		return ratingSum;
	}


	public void setReatingSum(Integer reatingSum) {
		this.ratingSum = reatingSum;
	}
	
	public Double ratingValue() {
		
		Double result; 
		result = (double) (this.getRatingSum()/this.getRatingCount()); 
		return result; 
	}
	
	// Relationships-------------------------------------
	

	private BrainStorming brain; 
	private Collection<Pros> pros; 
	private Collection<Cons> cons; 
	
	@NotNull
	@Valid
	@ManyToOne(optional= true)
	public BrainStorming getBrain() {
		return brain;
	}

	public void setBrain(BrainStorming brain) {
		this.brain = brain;
	}

	@Valid 
	@NotNull
	@OneToMany(mappedBy = "IdeaP")
	public Collection<Pros> getPros() {
		return pros;
	}

	public void setPros(Collection<Pros> pros) {
		this.pros = pros;
	}

	
	
	@Valid 
	@NotNull
	@OneToMany(mappedBy = "IdeaC")
	public Collection<Cons> getCons() {
		return cons;
	}

	public void setCons(Collection<Cons> cons) {
		this.cons = cons;
	}

	
	

}

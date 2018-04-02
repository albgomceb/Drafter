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
	private Double ratingValue; 
	
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
	public Double getRatingValue() {
		return ratingValue;
	}

	public void setRatingValue(Double ratingValue) {
		this.ratingValue = ratingValue;
	}
	
	
	// Relationships-------------------------------------
	


	private BrainStorming brain; 
	private Collection<Pros> pros; 
	private Collection<Cons> cons; 
	private Collection<Vote> votes; 
	
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
	@OneToMany(mappedBy = "idea")
	public Collection<Pros> getPros() {
		return pros;
	}

	public void setPros(Collection<Pros> pros) {
		this.pros = pros;
	}

	
	
	@Valid 
	@NotNull
	@OneToMany(mappedBy = "idea")
	public Collection<Cons> getCons() {
		return cons;
	}

	public void setCons(Collection<Cons> cons) {
		this.cons = cons;
	}

	
	@Valid
	@NotNull
	@OneToMany(mappedBy = "idea")
	public Collection<Vote> getVotes() {
		return votes;
	}

	public void setVotes(Collection<Vote> votes) {
		this.votes = votes;
	}
	

	public void addPros(Pros p) {
		this.pros.add(p);
		p.setIdea(this);
	}
	
	public void addCons(Cons c) {
		this.cons.add(c);
		c.setIdea(this);
	}
	
	public void addVote(Vote v) {
		this.votes.add(v);
		v.setIdea(this);
	}

	
	

}

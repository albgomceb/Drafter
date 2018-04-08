package drafter.domain;

import java.util.Collection;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Entity
@Access(AccessType.PROPERTY)
public class BrainStorming extends Meeting{
	
	//Atributes------------------------------------------
	private String votingMode; 
	private static final String ONETOFIVE = "ONETOFIVE"; 
	private static final String ONETOTEN = "ONETOTEN"; 
	
	//Constructor----------------------------------------
	public BrainStorming() {
		
	}

	//Methods--------------------------------------------
	
	@NotNull
	@Pattern(regexp = "^"+ONETOFIVE+"|"+ONETOTEN+"$")
	public String getVotingMode() {
		return votingMode;
	}


	public void setVotingMode(String votingMode) {
		this.votingMode = votingMode;
	}
	
	// Relationships-------------------------------------
	
	

	private Collection<Idea> ideas; 
	
	@Valid 
	@NotNull
	@OneToMany(cascade = CascadeType.ALL)
	public Collection<Idea> getIdeas() {
		return ideas;
	}

	public void setIdeas(Collection<Idea> ideas) {
		this.ideas = ideas;
	}

	public void addIdea(Idea idea) {
		this.ideas.add(idea);
		idea.setBrain(this);
		
	}
	
	public void addIdea(Idea idea) {
		this.ideas.add(idea);
		idea.setBrain(this);
		
	}
	
	
	
}

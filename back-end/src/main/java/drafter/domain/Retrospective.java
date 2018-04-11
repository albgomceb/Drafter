package drafter.domain;

import java.util.Collection;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Transient;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Entity
@Access(AccessType.PROPERTY)
public class Retrospective extends Meeting {

	
	//Constructor----------------------------------------
		
	public Retrospective() {
		
	}
	
	//Methods--------------------------------------------
	@Override
	@Transient
	public String getType() {
		return "retrospective";
	}
	
	
	// Relationships-------------------------------------
	

	private Collection<GoodPoint> gpoints; 
	private Collection<BadPoint> bpoints; 
	
	
	@Valid 
	@NotNull
	@OneToMany(mappedBy = "retroG")
	public Collection<GoodPoint> getGpoints() {
		return gpoints;
	}
	public void setGpoints(Collection<GoodPoint> gpoints) {
		this.gpoints = gpoints;
	}

	@Valid 
	@NotNull
	@OneToMany(mappedBy = "retroB")
	public Collection<BadPoint> getBpoints() {
		return bpoints;
	}


	public void setBpoints(Collection<BadPoint> bpoints) {
		this.bpoints = bpoints;
	}
	
}

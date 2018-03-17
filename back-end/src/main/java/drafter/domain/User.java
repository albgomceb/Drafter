package drafter.domain;

import java.util.Collection;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Entity
@Access(AccessType.PROPERTY)
public class User extends Actor{
	
	
	//Constructor----------------------------------------
	public User() {
		
	}
	
	
	// Relationships-------------------------------------
	
	
	
	private Collection<Organization> organizations; 
	
	@NotNull
	@Valid
	@OneToMany(mappedBy = "creator")
	public Collection<Organization> getOrganizations() {
		return organizations;
	}


	public void setOrganizations(Collection<Organization> organizations) {
		this.organizations = organizations;
	}


	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}

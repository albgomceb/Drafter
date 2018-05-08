package drafter.domain;

import java.util.List;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.SafeHtml;

@Entity
@Access(AccessType.PROPERTY)
public class Department extends DomainEntity{


	//Atributes------------------------------------------
	private String name; 
	
	
	
	//Constructor----------------------------------------
	public Department() {
		
	}

	//Methods--------------------------------------------
	
	@NotBlank
	@SafeHtml
	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}
	
	// Relationships-------------------------------------
	

	private Organization organization; 
	private List<User> workers; 
	
	@NotNull
	@Valid
	@ManyToOne(optional=false)
	public Organization getOrganization() {
		return organization;
	}



	public void setOrganization(Organization organization) {
		this.organization = organization;
	}



	@Valid
	@ManyToMany
	public List<User> getWorkers() {
		return workers;
	}



	public void setWorkers(List<User> workers) {
		this.workers = workers;
	}

	
	
	
}

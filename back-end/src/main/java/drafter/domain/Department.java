package drafter.domain;

import java.util.Collection;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
	private Collection<Participant> participants; 
	private Collection<User> users; 
	
	@NotNull
	@Valid
	@ManyToOne(optional=false)
	public Organization getOrganization() {
		return organization;
	}



	public void setOrganization(Organization organization) {
		this.organization = organization;
	}


	@NotNull
	@Valid
	@OneToMany(mappedBy = "department")
	public Collection<Participant> getParticipants() {
		return participants;
	}



	public void setParticipants(Collection<Participant> participants) {
		this.participants = participants;
	}


	@NotNull
	@Valid
	@ManyToMany
	public Collection<User> getUsers() {
		return users;
	}



	public void setUsers(Collection<User> users) {
		this.users = users;
	}

	
	
	
}

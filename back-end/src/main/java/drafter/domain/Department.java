package drafter.domain;

import java.util.Collection;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.NotBlank;
import org.springframework.transaction.annotation.Transactional;

@SuppressWarnings("deprecation")
@Entity
@Access(AccessType.PROPERTY)
@Transactional
public class Department extends DomainEntity {

	public Department() {
		super();
	}
	
	public Department(String name) {
		super();
		this.name = name;
	}


	//Attributes

	private String	name;
	
	


	@NotBlank
	public String getName() {
		return this.name;
	}

	public void setName(final String name) {
		this.name = name;
	}

	
	//Relationships
	
	private Collection<User> users;
	
	@ManyToMany
	@NotEmpty
	@Valid
	public Collection<User> getUsers(){
		return users;
	}
	
	public void setUsers(Collection<User> users){
		this.users = users;
	}
	

}


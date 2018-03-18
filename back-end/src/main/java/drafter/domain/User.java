package drafter.domain;

import java.util.Collection;
import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Entity
@Access(AccessType.PROPERTY)
public class User extends Actor	{

	// Constructor----------------------------------------
	public User() {

	}

	// Relationships-------------------------------------

	private Collection<Department> departments;
	private Collection<Organization> organizations;
	
	@NotNull
	@Valid
	@ManyToMany
	public Collection<Department> getDepartments() {
		return departments;
	}


	public void setDepartments(Collection<Department> departments) {
		this.departments = departments;
	}

	@NotNull
	@Valid
	@OneToMany(mappedBy = "user")
	public Collection<Organization> getOrganizations() {
		return organizations;
	}

	public void setOrganizations(Collection<Organization> organizations) {
		this.organizations = organizations;
	}

}

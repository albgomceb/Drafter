package drafter.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Access(AccessType.PROPERTY)
public class User extends Actor	{

	// Constructor----------------------------------------
	public User() {

	}

	// Relationships-------------------------------------

	private List<Department> departments;
	private List<Organization> organizations;
	private Date lastPay;
	
	@NotNull
	@Valid
	@ManyToMany(mappedBy="workers")
	public List<Department> getDepartments() {
		return departments;
	}


	public void setDepartments(List<Department> departments) {
		this.departments = departments;
	}

	@NotNull
	@Valid
	@OneToMany(mappedBy = "user")
	public List<Organization> getOrganizations() {
		return organizations;
	}

	public void setOrganizations(List<Organization> organizations) {
		this.organizations = organizations;
	}

	@Temporal(TemporalType.DATE)
	public Date getLastPay() {
		return lastPay;
	}

	public void setLastPay(Date lastPay) {
		this.lastPay = lastPay;
	}

}

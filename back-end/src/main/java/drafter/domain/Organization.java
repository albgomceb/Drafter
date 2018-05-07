package drafter.domain;

import java.util.Collection;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.SafeHtml;
import org.hibernate.validator.constraints.URL;

@Entity
@Access(AccessType.PROPERTY)
public class Organization extends DomainEntity{

	
	//Atributes------------------------------------------
	
	private String enterprise;
	private String description;
	private String address;
	private String phone;
	private String email;
	private String logo;
	
	
	//Constructor----------------------------------------
	public Organization() {
		
	}

	//Methods--------------------------------------------
	
	@NotBlank
	@SafeHtml
	public String getEnterprise() {
		return enterprise;
	}


	public void setEnterprise(String enterprise) {
		this.enterprise = enterprise;
	}

	
	@SafeHtml
	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}

	@NotBlank
	@SafeHtml
	public String getAddress() {
		return address;
	}

	
	public void setAddress(String address) {
		this.address = address;
	}

	@Pattern(regexp = "(^((\\+)[1-9]\\d{0,2}[ ])?([(](\\d\\d[1-9]|[1-9]\\d\\d|\\d[1-9]\\d)[)][ ])?\\w([ -]?\\w){3}([ -]?\\w)*$)?")
	public String getPhone() {
		return phone;
	}


	public void setPhone(String phone) {
		this.phone = phone;
	}

	@Email
	@NotBlank
	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}

	@Lob
	@SafeHtml
	@URL
	public String getLogo() {
		return logo;
	}


	public void setLogo(String logo) {
		this.logo = logo;
	}

	
	
	
	
	// Relationships-------------------------------------
	

	private User user;
	private Collection<Department> departments; 
	
	@NotNull
	@Valid
	@ManyToOne(optional = false)
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
	@NotNull
	@Valid
	@OneToMany(cascade = CascadeType.ALL)
	public Collection<Department> getDepartments() {
		return departments;
	}

	public void setDepartments(Collection<Department> departments) {
		this.departments = departments;
	}
	
	

	
	
	
}

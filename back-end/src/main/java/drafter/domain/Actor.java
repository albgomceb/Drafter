package drafter.domain;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.SafeHtml;
import org.hibernate.validator.constraints.URL;

import drafter.security.UserAccount;


@Entity
@Access(AccessType.PROPERTY)
public abstract class Actor extends DomainEntity{

	//Atributes------------------------------------------
	
	private String name; 
	private String surname; 
	private String email; 
	private String phone; 
	private String photo; 
	
	//Constructor----------------------------------------
	public Actor() {
		
	}

	//Methods--------------------------------------------
	
	@SafeHtml
	@NotBlank
	public String getName() {
		return name;
	}

	
	public void setName(String name) {
		this.name = name;
	}
	
	@SafeHtml
	@NotBlank
	public String getSurname() {
		return surname;
	}


	public void setSurname(String surname) {
		this.surname = surname;
	}

	@Email
	@NotBlank
	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}

	@Pattern(regexp = "(^((\\+)[1-9]\\d{0,2}[ ])?([(](\\d\\d[1-9]|[1-9]\\d\\d|\\d[1-9]\\d)[)][ ])?\\w([ -]?\\w){3}([ -]?\\w)*$)?")
	public String getPhone() {
		return phone;
	}


	public void setPhone(String phone) {
		this.phone = phone;
	}

	@Lob
	@SafeHtml
	@URL
	public String getPhoto() {
		return photo;
	}


	public void setPhoto(String photo) {
		this.photo = photo;
	}
	
	
	
	// Relationships-------------------------------------
	
	private UserAccount userAccount; 
	
	@NotNull
	@Valid
	@OneToOne(cascade = CascadeType.ALL,optional=false)
	public UserAccount getUserAccount() {
		return userAccount; 
	}
	
	public void setUserAccount(UserAccount userAccount) {
	    this.userAccount = userAccount;
	  }
	
}

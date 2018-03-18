package drafter.domain;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.SafeHtml;

@Entity
@Access(AccessType.PROPERTY)
public class Project extends DomainEntity{
	
	//Atributes------------------------------------------
	private String name; 
	private String description; 
	
	
	//Constructor----------------------------------------
	public Project() {
		
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

	
	@SafeHtml
	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}

	
	// Relationships-------------------------------------
}

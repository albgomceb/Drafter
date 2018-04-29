package drafter.domain;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.SafeHtml;

@Entity
@Access(AccessType.PROPERTY)
public class HatConclusion extends DomainEntity{

	//Atributes------------------------------------------
	private String text; 	
	
	//Constructor----------------------------------------
	public HatConclusion() {
		
	}




	//Methods--------------------------------------------
	@NotBlank
	@SafeHtml
	public String getText() {
		return text;
	}


	public void setText(String text) {
		this.text = text;
	}


	// Relationships-------------------------------------
	private Hat hat;

	@NotNull
	@Valid
	@ManyToOne(optional = false)
	public Hat getHat() {
		return hat;
	}

	public void setHat(Hat hat) {
		this.hat = hat;
	}
	
}

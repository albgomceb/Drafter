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
public class SprintBacklog extends DomainEntity{

	private String text; 
	
	
	public SprintBacklog() {
		
	}

	@NotBlank
	@SafeHtml
	public String getText() {
		return text;
	}


	public void setText(String text) {
		this.text = text;
	}
	
	

	private Planning p; 
	
	@NotNull
	@Valid 
	@ManyToOne(optional = false)
	public Planning getP() {
		return p;
	}


	public void setP(Planning p) {
		this.p = p;
	}

}

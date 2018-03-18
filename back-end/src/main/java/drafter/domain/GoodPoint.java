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
public class GoodPoint extends DomainEntity{

	//Atributes------------------------------------------
	private String goodpoint; 
	
	//Constructor----------------------------------------
	public GoodPoint() {
		
	}

	//Methods--------------------------------------------
	
	@SafeHtml
	@NotBlank
	public String getGoodpoint() {
		return goodpoint;
	}


	public void setGoodpoint(String goodpoint) {
		this.goodpoint = goodpoint;
	}

	
	// Relationships-------------------------------------
	

	private Retrospective retroG; 
	
	
	@Valid 
	@NotNull
	@ManyToOne(optional = true)
	public Retrospective getRetroG() {
		return retroG;
	}

	public void setRetroG(Retrospective retroG) {
		this.retroG = retroG;
	}
	
	

}

package drafter.domain;

import java.util.ArrayList;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Range;
import org.hibernate.validator.constraints.SafeHtml;

@Entity
@Access(AccessType.PROPERTY)
public class Hat extends DomainEntity{
	
	
	private static final String BLUE = "BLUE"; 
	private static final String RED = "RED"; 
	private static final String BLACK = "BLACK"; 
	private static final String YELLOW = "YELLOW"; 
	private static final String GREEN = "GREEN"; 
	private static final String WHITE = "WHITE"; 
	private int orden; 
	private String color; 
	private ArrayList<String> conclusions;
	
	public Hat() {
		
	}

	@Range(min=0,max=5)
	public int getOrden() {
		return orden;
	}


	public void setOrden(int orden) {
		this.orden = orden;
	}

	@NotNull
	@SafeHtml
	@Pattern(regexp = "^"+RED+"|"+BLUE+"|"+BLACK+"|"+WHITE+"|"+YELLOW+"|"+GREEN+"$")
	public String getColor() {
		return color;
	}


	public void setColor(String color) {
		this.color = color;
	}
	
	
	public ArrayList<String> getConclusions() {
		return conclusions;
	}

	public void setConclusions(ArrayList<String> conclusions) {
		this.conclusions = conclusions;
	}

	// Relationships ---------------------------------------------------------------
	private SixHats sixHats; 
	
	@NotNull
	@Valid
	@ManyToOne(optional = false)
	public SixHats getSixHats() {
		return sixHats;
	}
	
	public void setSixHats(SixHats sixHats) {
		this.sixHats = sixHats;
	}	

}

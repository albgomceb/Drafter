package drafter.domain;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Entity
@Access(AccessType.PROPERTY)
public class Hat extends DomainEntity{
	
	
	private static final String BLUE = "BLUE"; 
	private static final String RED = "RED"; 
	private static final String BLACK = "BLACK"; 
	private static final String YELLOW = "YELLOW"; 
	private static final String GREEN = "GREEN"; 
	private static final String WHITE = "WHITE"; 
	private int time; 
	private String color; 
	
	public Hat() {
		
	}


	public int getTime() {
		return time;
	}


	public void setTime(int time) {
		this.time = time;
	}

	@NotNull
	@Pattern(regexp = "^"+RED+"|"+BLUE+"|"+BLACK+"|"+WHITE+"|"+YELLOW+"|"+GREEN+"$")
	public String getColor() {
		return color;
	}


	public void setColor(String color) {
		this.color = color;
	}


	private SixHats sixH; 
	
	@NotNull
	@Valid
	@ManyToOne(optional = false)
	public SixHats getSixH() {
		return sixH;
	}


	public void setSixH(SixHats sixH) {
		this.sixH = sixH;
	}
	
	

}

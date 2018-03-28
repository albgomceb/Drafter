package drafter.domain;

import java.util.Collection;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
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
	private int order; 
	private String color; 
	private Collection<String> conclussions;
	
	public Hat() {
		
	}

	@Range(min=0,max=5)
	public int getOrder() {
		return order;
	}


	public void setOrder(int order) {
		this.order = order;
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
	
	@SafeHtml
	public Collection<String> getConclussions() {
		return conclussions;
	}

	public void setConclussions(Collection<String> conclussions) {
		this.conclussions = conclussions;
	}

	// Relationships
	private SixHats sixHats; 
	
	@NotNull
	@Valid
	@ManyToOne(optional = false)
	public SixHats getSixHats() {
		return sixHats;
	}
	
	@Valid
	@OneToOne(optional = true)
	public void setSixHats(SixHats sixHats) {
		this.sixHats = sixHats;
	}	

}

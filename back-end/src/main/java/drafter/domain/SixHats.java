package drafter.domain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Access(AccessType.PROPERTY)
public class SixHats extends Meeting{

	public SixHats() {
		this.hats = new ArrayList<Hat>();
		this.roundTime = new Date();
	}
	
	private Date roundTime;

	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(pattern = "dd/MM/yyyy HH:mm")
	public Date getRoundTime() {
		return roundTime;
	}

	public void setRoundTime(Date roundTime) {
		this.roundTime = roundTime;
	}

	// ------------ Relationships ---------------
	private Collection<Hat> hats; 
	
	@NotNull
	@Valid
	@OneToMany(mappedBy = "sixHats", fetch=FetchType.EAGER)
	public Collection<Hat> getHats() {
		return hats;
	}

	public void setHats(Collection<Hat> hats) {
		this.hats = hats;
	}

	@Override
	@Transient
	public String getType() {
		return "six-hats";
	}

	

}

package drafter.domain;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Transient;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Entity
@Access(AccessType.PROPERTY)
public class SixHats extends Meeting{

	public SixHats() {
		this.hats = new ArrayList<Hat>();
	}

	private Collection<Hat> hats; 
	
	@NotNull
	@Valid
	@OneToMany(mappedBy = "sixHats")
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

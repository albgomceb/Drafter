package drafter.domain;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.Transient;

@Entity
@Access(AccessType.PROPERTY)
public class Standard extends Meeting{

	
	//Constructor----------------------------------------
	public Standard() {
		super();
	}
	
	// Methods-------------------------------------------
	
	@Override
	@Transient
	public String getType() {
		return "standard";
	}
	

	// Relationships-------------------------------------

}

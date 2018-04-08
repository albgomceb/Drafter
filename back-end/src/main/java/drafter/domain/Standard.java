package drafter.domain;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;

@Entity
@Access(AccessType.PROPERTY)
public class Standard extends Meeting{

	
	//Constructor----------------------------------------
	public Standard() {
		super();
		super.type = "standard";
	}
	public Standard(Meeting meeting) {
		super();
		super.type = "standard";
	}
	// Relationships-------------------------------------

}

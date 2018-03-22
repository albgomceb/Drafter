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
	}
	public Standard(Meeting meeting) {
		super();
	}
	// Relationships-------------------------------------

}

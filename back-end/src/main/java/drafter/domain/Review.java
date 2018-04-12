package drafter.domain;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.Transient;

@Entity
@Access(AccessType.PROPERTY)
public class Review extends Meeting{
	
	
	//Constructor----------------------------------------
	public Review() {
		super();
	}

	
	// Methods-------------------------------------------
	@Override
	@Transient
	public String getType() {
		// TODO Auto-generated method stub
		return "review";
	}
	
	
	// Relationships-------------------------------------

}

package drafter.domain;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;

@Entity
@Access(AccessType.PROPERTY)
public class User extends Actor {


	public User() {
		super();
	}


	//Relationships


}

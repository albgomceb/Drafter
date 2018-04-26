/* UserAccountRepository.java
 *
 * Copyright (C) 2016 Universidad de Sevilla
 * 
 * The use of this project is hereby constrained to the conditions of the 
 * TDG Licence, a copy of which you may download from 
 * http://www.tdg-seville.info/License.html
 * 
 */

package drafter.security;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import drafter.domain.User;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Integer> {

	UserAccount findByUsername(String username);
	
	@Query("select u from User u join u.userAccount ua where u.email = ?1")
	User findByEmailAndPassword(String email);


}

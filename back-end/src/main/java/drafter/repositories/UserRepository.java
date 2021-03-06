package drafter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import drafter.domain.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	@Query("select u from User u where u.email = ?1")
	User findByEmail(String email);

	@Query("select u from User u where u.userAccount.id = ?1")
	User findByUserAccount(int id);
	
	@Query("select u from User u where u.userAccount.username = ?1")
	User findByUsername(String username);
	
	@Query("select u from User u join u.departments d where (u.name like %?1% or u.surname like %?1% or u.email like %?1% or u.userAccount.username like %?1%) and (d.name like %?2%)")
	List<User> filterUsers(String keyword, String department);
	
	@Query("select u from User u where u.name like %?1% or u.surname like %?1%")
	List<User> filterUsers2(String keyword);
	
	@Query("select u from User u where u.id !=?1")
	List<User> findAllWithoutPrincipal(int id);

	
	
}

package drafter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import drafter.domain.Department;
import drafter.domain.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	
	@Query("select d from Department d join d.users u where u.id = ?1")
	Department findDepartmentByUser(int userId);


}

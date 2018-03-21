package drafter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import drafter.domain.Department;
import drafter.domain.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {


}

package drafter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import drafter.domain.Organization;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Integer> {

	@Query("select o from Organization o where o.user.id = ?1")
	List<Organization> findByUserId(int userId);

}

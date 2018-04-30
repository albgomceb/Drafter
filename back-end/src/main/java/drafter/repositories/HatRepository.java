package drafter.repositories;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import drafter.domain.Hat;

@Repository

public interface HatRepository extends JpaRepository<Hat, Integer> {
	
	@Query("select hats from SixHats sixHats join sixHats.hats hats where sixHats.id=?1")
	public Collection<Hat> getHatsOfSixHats(int sixHatsId);
   
}

package drafter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import drafter.domain.SixHats;

@Repository

public interface SixHatsRepository extends JpaRepository<SixHats, Integer> {
   
}

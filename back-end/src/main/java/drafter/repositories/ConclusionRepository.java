package drafter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import drafter.domain.Conclusion;

@Repository
public interface ConclusionRepository extends JpaRepository<Conclusion, Integer> {

}

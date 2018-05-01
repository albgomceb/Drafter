package drafter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import drafter.domain.HatConclusion;

@Repository
public interface HatConclusionRepository extends JpaRepository<HatConclusion,Integer> {
    @Query("select hc from HatConclusion hc where hc.hat.id = ?1")
    List<HatConclusion> findByHat(int hatId);

}

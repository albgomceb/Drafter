package drafter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import drafter.domain.BrainStorming;

@Repository
public interface BrainStormingRepository extends JpaRepository<BrainStorming, Integer>{

}

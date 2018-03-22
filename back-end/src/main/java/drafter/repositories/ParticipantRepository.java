package drafter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import drafter.domain.Participant;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Integer> {


}

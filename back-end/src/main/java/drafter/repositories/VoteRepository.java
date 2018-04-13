package drafter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import drafter.domain.Vote;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Integer> {
	@Query("select v from Vote v where v.participant.id = ?1 and v.idea.id = ?2")
    Vote findByParticipantAndIdea(int paricipantId,int Ideaid);	
}
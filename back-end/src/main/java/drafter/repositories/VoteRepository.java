package drafter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import drafter.domain.Vote;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Integer> {
}
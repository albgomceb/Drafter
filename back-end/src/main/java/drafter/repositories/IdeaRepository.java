package drafter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Repository;

import drafter.domain.Idea;

@Repository

public interface IdeaRepository extends JpaRepository<Idea, Integer> {
	
	@Query("select i from Idea i where i.brain.id = ?1")
    List<Idea> findByMeeting(int id);

	@Query("select i,avg(v.value) as ivotes from Idea i join i.votes v where i.brain.id = ?1 group by i order by ivotes DESC")
    List<Object[]> findSortedByMeeting(int id);
}

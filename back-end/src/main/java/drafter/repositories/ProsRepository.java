package drafter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import drafter.domain.Pros;

@Repository
public interface ProsRepository extends JpaRepository<Pros,Integer> {
    @Query("select p from Pros p where p.idea.id = ?1")
    List<Pros> findByIdea(int ideaId);

}

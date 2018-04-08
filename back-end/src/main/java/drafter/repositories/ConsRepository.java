package drafter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import drafter.domain.Cons;

@Repository
public interface ConsRepository extends JpaRepository<Cons,Integer> {
    @Query("select c from Cons c where c.idea.id = ?1")
    List<Cons> findByIdea(int ideaId);

}

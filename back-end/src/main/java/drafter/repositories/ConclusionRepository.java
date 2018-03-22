package drafter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import drafter.domain.Conclusion;

@Repository
public interface ConclusionRepository extends JpaRepository<Conclusion,Integer> {
    @Query("select c from Conclusion c where c.agenda.id = ?1")
    List<Conclusion> findByAgenda(int agendaId);

}

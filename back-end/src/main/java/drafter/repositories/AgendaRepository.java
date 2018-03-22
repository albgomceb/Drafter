package drafter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import drafter.domain.Agenda;

@Repository
public interface AgendaRepository extends JpaRepository<Agenda, Integer> {

	@Query("select a from Agenda a where a.meeting.id = ?1")
	List<Agenda> findByMeeting(int id);
}

package drafter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import drafter.domain.Agenda;

@Repository
public interface AgendaRepository extends JpaRepository<Agenda, Integer> {


}

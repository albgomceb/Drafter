package drafter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import drafter.domain.Standard;

@Repository
public interface StandardRepository extends JpaRepository<Standard, Integer> {


}

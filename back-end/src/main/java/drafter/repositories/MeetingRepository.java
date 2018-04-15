package drafter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import drafter.domain.Meeting;


@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Integer>{

	@Query("select m from Meeting m join m.participants p where p.user.id = ?1")
	List<Meeting> findByUserId(int userId);
}

package drafter.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import drafter.domain.Meeting;


@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Integer>{

	@Query("select m from Meeting m join m.participants p where p.user.id = ?1")
	Page<Meeting> findByUserId(int userId, Pageable pageable);
}

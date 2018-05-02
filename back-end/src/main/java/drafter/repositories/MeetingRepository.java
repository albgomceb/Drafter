package drafter.repositories;

import java.util.Collection;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import drafter.domain.Meeting;
import drafter.domain.User;


@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Integer>{

	@Query("select m from Meeting m join m.participants p where p.user.id = ?1")
	Page<Meeting> findByUserId(int userId, Pageable pageable);
	
	@Query("select m from Participant p join p.meeting m where "
			+ "p.user.id = ?1 and m.hasfinished=false and "
			+ "(p.showNotification = null or p.showNotification = true) and "
			+ "p.role!='LEADER'")
	Collection<Meeting> findNotifications(int userId);
	
	@Query("select p.user from Participant p where p.meeting.id=?1 and p.role='LEADER'")
	User getLeader(int meetingId);
}

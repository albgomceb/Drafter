package drafter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import drafter.domain.Participant;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Integer> {
	

	@Query("select p from Participant p where p.meeting.id = ?1 and p.user.id = ?2")
	Participant findByMeetingAndUser(int meetingId,int userId);

}

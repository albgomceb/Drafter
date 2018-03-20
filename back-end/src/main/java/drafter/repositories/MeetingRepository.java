package drafter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import drafter.domain.Meeting;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Integer> {


}
package drafter.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.domain.Meeting;
import drafter.domain.Participant;
import drafter.domain.User;
import drafter.repositories.MeetingRepository;

@Service
@Transactional
public class MeetingService {

	//Repository-------------------------------------------------------------------------------

	@Autowired
	private MeetingRepository	meetingRepository;


	//Constructor------------------------------------------------------------------------------

	public MeetingService() {
		super();
	}

	//CRUD Methods------------------------------------------------------------------------------

    public Meeting create(Meeting meeting) {
    	Date date = new Date(System.currentTimeMillis()-1);
    	
    	List<Participant> participants = new ArrayList<Participant>();
    	meeting.setParticipants(participants);
    	meeting.setDate(date);
    	
        return meetingRepository.save(meeting);
    }

    public Meeting delete(int id) {
        Meeting meeting = findById(id);
        if(meeting != null){
        	meetingRepository.delete(meeting);
        }
        return meeting;
    }

	public List<Meeting> findAll() {
        return meetingRepository.findAll();
    }

    public Meeting findById(int id) {
        return meetingRepository.getOne(id);
    }

    public User update(User user) {
        return null;
    }

	//Other business Methods-----------------------------------------------------------------------------

}    
    
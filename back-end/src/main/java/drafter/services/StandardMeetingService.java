package drafter.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.domain.Meeting;
import drafter.domain.Standard;
import drafter.domain.User;
import drafter.repositories.StandardMeetingRepository;

@Service
@Transactional
public class StandardMeetingService {

	//Repository-------------------------------------------------------------------------------

	@Autowired
	private StandardMeetingRepository	standardMeetingRepository;


	//Constructor------------------------------------------------------------------------------

	public StandardMeetingService() {
		super();
	}

	//CRUD Methods------------------------------------------------------------------------------

    public Meeting create(Standard meeting) {
        return standardMeetingRepository.save(meeting);
    }

    public Standard delete(int id) {
    	Standard meeting = findById(id);
        if(meeting != null){
        	standardMeetingRepository.delete(meeting);
        }
        return meeting;
    }

	public List<Standard> findAll() {
        return standardMeetingRepository.findAll();
    }

    public Standard findById(int id) {
        return standardMeetingRepository.getOne(id);
    }

    public User update(User user) {
        return null;
    }

	//Other business Methods-----------------------------------------------------------------------------

}    
    
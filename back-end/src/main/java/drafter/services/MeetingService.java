package drafter.services;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.domain.Agenda;
import drafter.domain.Meeting;
import drafter.domain.Participant;
import drafter.domain.Step;
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

    public Meeting save(Meeting meeting) {
    	Date date = new Date(System.currentTimeMillis()-1);
    	if(meeting.getParticipants() == null)
    		meeting.setParticipants( new ArrayList<Participant>());
    		
    	meeting.setDate(date);
    	meeting.setSteps(new ArrayList<Step>());
    	meeting.setAgendas(new ArrayList<Agenda>());
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

    public Meeting finish(int id) {
    	Meeting m = findById(id);
    	int size = m.getSteps().size();
    	
    	m.setStatus(size == 0 ? 1 : size);
    	m.setHasfinished(true);
    	
    	return save(m);
    }

	//Other business Methods-----------------------------------------------------------------------------

}    


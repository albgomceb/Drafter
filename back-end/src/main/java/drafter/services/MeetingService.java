package drafter.services;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Service;
//import org.springframework.util.Assert;
import org.springframework.stereotype.Service;

import drafter.domain.Agenda;
import drafter.domain.Meeting;
import drafter.domain.Participant;
import drafter.domain.Step;
import drafter.domain.User;
import drafter.repositories.MeetingRepository;
import drafter.security.LoginService;

@Service
@Transactional
public class MeetingService {

	//Repository-------------------------------------------------------------------------------

	@Autowired
	private MeetingRepository	meetingRepository;
	
	@Autowired
	private UserService    	    userService;
	
	@Autowired
	private ParticipantService participantService;
	
	@Autowired
	private LoginService loginService;


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
//    	if(!isParticipant(id))
//			throw new IllegalStateException();
    	
    	Meeting m = findById(id);
    	int size = m.getSteps().size();
    	
    	m.setStatus(size == 0 ? 1 : size);
    	m.setHasfinished(true);
    	
    	return save(m);
    }
    
    public Meeting nextStep(int id) {
//    	if(!isParticipant(id))
//			throw new IllegalStateException();
    	
    	Meeting m = findById(id);
    	int size = m.getSteps().size();
    	//Revisar la construccion de steps
//    	Assert.isTrue(size >= m.getStatus(), "The meeting hasn't more steps, you must finish it!");
    	m.setStatus(m.getStatus()+1);
    	
    	return save(m);
    }
    
    public boolean isParticipant(int id) {
    	Meeting m = findById(id);
    	User principal = userService.findByPrincipal();
    	for(Participant p : m.getParticipants())
    		if(p.getUser().equals(principal))
    			return true;
    	
    	return false;
    }
    
    public Meeting setTimer(int id, int timer) {
    	Meeting m = findById(id);
    	m.setTimer(timer);
    	
    	return save(m);
    }

	//Other business Methods-----------------------------------------------------------------------------

    public Page<Meeting> findByUserId(int userId, Pageable pageable) {
		return meetingRepository.findByUserId(userId, pageable);
	}

	public Participant attended(int meetingId, User user) {
		Meeting m  = findById(meetingId);
		User principal = user !=null?user:userService.findByPrincipal();
		Participant updated = null;
//		if(isParticipant(meetingId)) {
			for(Participant p : m.getParticipants())
				if(p.getUser().equals(principal)) {
					p.setHasAttended(true);
					updated = participantService.save(p);
					break;
				}

//		}
		return updated;
	}
	public Participant quit(int meetingId, User user) {
		Meeting m  = findById(meetingId);
		User principal = user !=null?user:userService.findByPrincipal();
		Participant updated = null;
//		if(isParticipant(meetingId)) {
		for(Participant p : m.getParticipants())
			if(p.getUser().equals(principal)) {
				p.setHasAttended(false);
				updated = participantService.save(p);
				break;
			}
		
//		}
		return updated;
	}
}    


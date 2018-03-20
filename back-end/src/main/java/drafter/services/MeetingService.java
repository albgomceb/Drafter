package drafter.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.domain.Meeting;
import drafter.repositories.MeetingRepository;

@Service
@Transactional
public class MeetingService {

	@Autowired
	private MeetingRepository meetingRepository; 
	
	
	public MeetingService() {
		
	}

	public List<Meeting> findAll(){
		return meetingRepository.findAll(); 
	}
	
	public Meeting findOne(int id) {
		return meetingRepository.getOne(id);  
		
	}
	
	
}

package drafter.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import drafter.domain.Conclusion;
import drafter.repositories.ConclusionRepository;

public class ConclusionService {

	
	@Autowired
	public ConclusionRepository conclusionRepository; 
	
	
	public ConclusionService() {
		
	}
	
	public List<Conclusion> findAll(){
		return conclusionRepository.findAll(); 
	}
	
	
	public Conclusion findById(int id) {
		return conclusionRepository.getOne(id); 
	}

}

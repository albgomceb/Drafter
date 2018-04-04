package drafter.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.domain.BrainStorming;
import drafter.repositories.BrainStormingRepository;

@Service
@Transactional
public class BrainStormingService {

	
	//Repository-------------------------------------------------------------------------------
	
	@Autowired 
	private BrainStormingRepository bsRepository; 
	
	
	
	
	
	
	
	//Constructor------------------------------------------------------------------------------
	
	public BrainStormingService() {
		super(); 
	}

	//CRUD Methods------------------------------------------------------------------------------

	
	public List<BrainStorming> findAll(){
		return bsRepository.findAll(); 
	}
	
	
	public BrainStorming findById(int id) {
		return bsRepository.getOne(id); 
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}

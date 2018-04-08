package drafter.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.domain.Agenda;
import drafter.domain.Idea;
import drafter.repositories.IdeaRepository;

@Service
@Transactional
public class IdeaService {
	
	//Repository-------------------------------------------------------------------------------

		@Autowired
		private IdeaRepository ideaRepository;


		//Constructor------------------------------------------------------------------------------

		public IdeaService() {
			super();
		}
		
		//CRUD Methods------------------------------------------------------------------------------
	    
	    public Idea save(Idea idea) {
	    	return ideaRepository.save(idea);
	    }

	    public void delete(int id) {
	    	Idea res = findById(id);
	        if(res != null)
	        	ideaRepository.delete(res);
	    }

		public List<Idea> findAll() {
	        return ideaRepository.findAll();
	    }

	    public Idea findById(int id) {
	        return ideaRepository.getOne(id);
	    }
	    
	  //Other business Methods-----------------------------------------------------------------------------
	    
	    public List<Idea> findByMeeting(int id) {
	        return ideaRepository.findByMeeting(id);
	    }
	    

}

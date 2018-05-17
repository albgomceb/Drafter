package drafter.services;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import drafter.beans.idea.IdeaBean;
import drafter.beans.idea.IdeaSerializer;
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
	    	Idea res = ideaRepository.save(idea);
	    	res.setVersion(res.getVersion()+1);
	    	return res;
	    }
	    
	    public IdeaBean saveBean(Idea idea) {
	    	return new IdeaSerializer().fromIdea(save(idea));
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
	    public List<Idea> findSortedByMeeting(int id) {
	    	List<Object[]> ideasV;
	        List<Idea> ideas= new ArrayList<Idea>();
	        ideasV =ideaRepository.findSortedByMeeting(id);
	        for(int i=0;i<ideasV.size();i++) {
	        	ideas.add((Idea) ideasV.get(i)[0]);
	        }
	        return ideas;
	    }

}

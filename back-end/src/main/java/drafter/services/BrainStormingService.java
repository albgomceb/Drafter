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
		private BrainStormingRepository	BrainStormingRepository;


		//Constructor------------------------------------------------------------------------------

		public BrainStormingService() {
			super();
		}

		//CRUD Methods------------------------------------------------------------------------------

	    public BrainStorming create(BrainStorming brainStorming) {
	        return BrainStormingRepository.save(brainStorming);
	    }

	    public BrainStorming delete(int id) {
	        BrainStorming brainStorming = findById(id);
	        if(brainStorming != null){
	        	BrainStormingRepository.delete(brainStorming);
	        }
	        return brainStorming;
	    }

		public List<BrainStorming> findAll() {
	        return BrainStormingRepository.findAll();
	    }

	    public BrainStorming findById(int id) {
	        return BrainStormingRepository.getOne(id);
	    }

	    public BrainStorming update(BrainStorming brainStorming) {
	        return null;
	    }
}

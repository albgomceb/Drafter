package drafter.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.domain.Hat;
import drafter.domain.HatConclusion;
import drafter.repositories.HatConclusionRepository;

@Service
@Transactional
public class HatConclusionService {
	
	//Repository-------------------------------------------------------------------------------

	@Autowired
	private HatConclusionRepository hatConclusionRepository;


	//Constructor------------------------------------------------------------------------------

	public HatConclusionService() {
		super();
	}
	

	//CRUD Methods------------------------------------------------------------------------------

    public HatConclusion create(Hat hat) {
    	HatConclusion hatConclusion = new HatConclusion();
    	
    	hatConclusion.setHat(hat);
    	
        return hatConclusion;
    }
    
    public HatConclusion save(HatConclusion conclusion) {
    	return hatConclusionRepository.save(conclusion);
    }

    public void delete(int id) {
    	HatConclusion res = findById(id);
        if(res != null)
        	hatConclusionRepository.delete(res);
    }

	public List<HatConclusion> findAll() {
        return hatConclusionRepository.findAll();
    }

    public HatConclusion findById(int id) {
        return hatConclusionRepository.getOne(id);
    }

    
	//Other business Methods-----------------------------------------------------------------------------

    public List<HatConclusion> findByHat(int hatId) {
    	return hatConclusionRepository.findByHat(hatId);
    }
}

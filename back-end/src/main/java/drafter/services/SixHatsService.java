package drafter.services;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.domain.Hat;
import drafter.domain.SixHats;
import drafter.repositories.SixHatsRepository;


@Service
@Transactional
public class SixHatsService {

	//Repository-------------------------------------------------------------------------------

	@Autowired
	private SixHatsRepository	sixHatsRepository;

	//Constructor------------------------------------------------------------------------------

	public SixHatsService() {
		super();
	}

	//CRUD Methods------------------------------------------------------------------------------

    public SixHats create(SixHats sixHats) {
    	sixHats.setHats(new ArrayList<Hat>());
        return sixHatsRepository.save(sixHats);
    }

    public SixHats delete(int id) {
    	SixHats sixHats = findById(id);
        if(sixHats != null){
        	sixHatsRepository.delete(sixHats);
        }
        return sixHats;
    }

	public List<SixHats> findAll() {
        return sixHatsRepository.findAll();
    }

    public SixHats findById(int id) {
        return sixHatsRepository.getOne(id);
    }

    public SixHats update(SixHats sixHats) {
        return null;
    }

	public SixHats save(SixHats sixHats) {
		List<String> colors = new ArrayList<>();
    	for(Hat hat : sixHats.getHats()) {
    		if(colors.contains(hat.getColor())) 
    			throw new IllegalArgumentException("A meeting can have no hats with the same color.");
    		else 
    			colors.add(hat.getColor());
    	}
		return sixHatsRepository.save(sixHats);
	}
	
	// Other business methods -----------------------------------------------------------------
	


}

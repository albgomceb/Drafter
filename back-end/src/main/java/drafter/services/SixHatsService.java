package drafter.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.assertj.core.util.Arrays;
import org.hibernate.validator.constraints.SafeHtml;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.domain.Agenda;
import drafter.domain.Hat;
import drafter.domain.Participant;
import drafter.domain.SixHats;
import drafter.domain.Step;
import drafter.repositories.SixHatsRepository;


@Service
@Transactional
public class SixHatsService {
	
	private String string;

	//Repository-------------------------------------------------------------------------------

	@Autowired
	private SixHatsRepository	sixHatsRepository;
	
	@Autowired
	private MeetingService		meetingService;

	//Constructor------------------------------------------------------------------------------

	public SixHatsService() {
		super();
	}

	//CRUD Methods------------------------------------------------------------------------------

    public SixHats create() {
    	SixHats sixHats = new SixHats();
    	Date date = new Date(System.currentTimeMillis()-1);
    	List<Hat> hats = new ArrayList<Hat>();
    	hats.add(create("RED", 0));
    	hats.add(create("BLUE", 1));
    	hats.add(create("BLACK", 2));
    	hats.add(create("WHITE", 3));
    	hats.add(create("YELLOW", 4));
    	hats.add(create("GREEN", 5));
    	
    	sixHats.setParticipants( new ArrayList<Participant>());
    	sixHats.setDate(date);
    	sixHats.setSteps(new ArrayList<Step>());
    	sixHats.setAgendas(new ArrayList<Agenda>());
    	sixHats.setHats(hats);
    	
        return sixHats;
    }
    
    public Hat create(String color, int orden) {
    	Hat res = new Hat();
    	res.setColor(color);
    	res.setOrden(orden);
    	res.setConclusions(new ArrayList<String>());
    	
    	return res;
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
		sixHats.getHats().stream()
			.forEach(h -> h.getConclusions().stream().forEach(text -> {string = text; checkSafeHtml();}));
		
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
	
	@SafeHtml
	public String checkSafeHtml() {
		return string;
	}
	
	public Collection<Hat> reassignHats(SixHats sixHats){
		List<Hat> res = new ArrayList<Hat>(sixHats.getHats());
		
		for(Hat hat : res) {
			int orden = hat.getOrden();
			if(orden < 5) 
				hat.setOrden(orden++);
			else
				hat.setOrden(0);	
		}
		
		return res;
	}


}

package drafter.services;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.domain.Agenda;
import drafter.domain.Hat;
import drafter.domain.SixHats;
import drafter.repositories.SixHatsRepository;


@Service
@Transactional
public class SixHatsService {
	

	//Repository-------------------------------------------------------------------------------

	@Autowired
	private SixHatsRepository	sixHatsRepository;
	
	@Autowired
	private HatService		hatService;
	
	@Autowired
	private MeetingService		meetingService;

	//Constructor------------------------------------------------------------------------------

	public SixHatsService() {
		super();
	}

	//CRUD Methods------------------------------------------------------------------------------

    public SixHats create(SixHats meeting) { 
    	SixHats res = new SixHats();
    	List<Hat> hats = new ArrayList<Hat>();
    	hats.add(create("RED", 0, res));
    	hats.add(create("BLUE", 1, res));
    	hats.add(create("BLACK", 2, res));
    	hats.add(create("WHITE", 3, res));
    	hats.add(create("YELLOW", 4, res));
    	hats.add(create("GREEN", 5, res));
    	
    	res.setParticipants(meeting.getParticipants());
    	res.setDate(meeting.getDate());
    	res.setSteps(meeting.getSteps());
    	res.setAgendas(new ArrayList<Agenda>());
    	res.setHats(hats);
    	res.setDescription(meeting.getDescription());
    	res.setId(meeting.getId());
    	res.setImage(meeting.getImage());
    	res.setHasfinished(false);
    	res.setNumberOfMeeting(meeting.getNumberOfMeeting());
    	res.setProject(meeting.getProject());
    	res.setStatus(1);
    	res.setTimer(meeting.getTimer());
    	res.setTitle(meeting.getTitle());
    	
    	return res;
    	
    }
    
    public Hat create(String color, int orden, SixHats sixHats) {
    	Hat res = new Hat();
    	res.setColor(color);
    	res.setOrden(orden);
    	res.setConclusions(new ArrayList<String>());
    	res.setSixHats(sixHats);
    	
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
		List<String> colors = new ArrayList<>();
    	for(Hat hat : sixHats.getHats()) {
    		if(colors.contains(hat.getColor())) 
    			throw new IllegalArgumentException("A meeting can have no hats with the same color.");
    		else 
    			colors.add(hat.getColor());
    			hat.setSixHats(sixHats);
    			hatService.save(hat);
    	}
		return sixHatsRepository.save(sixHats);
	}
	
	// Other business methods -----------------------------------------------------------------


}

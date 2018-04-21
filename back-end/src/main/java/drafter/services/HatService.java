package drafter.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.domain.Hat;
import drafter.domain.SixHats;
import drafter.domain.HatConclusion;
import drafter.repositories.HatRepository;


@Service
@Transactional
public class HatService {

	//Repository-------------------------------------------------------------------------------

	@Autowired
	private HatRepository	hatRepository;
	
	@Autowired
	private SixHatsService		sixHatsService;
	
	private String string;

	//Constructor------------------------------------------------------------------------------

	public HatService() {
		super();
	}

	//CRUD Methods------------------------------------------------------------------------------
    
    public Hat create(String color, int orden, SixHats sixHats) {
    	Hat res = new Hat();
    	res.setColor(color);
    	res.setOrden(orden);
    	res.setHatConclusions(new ArrayList<HatConclusion>());
    	res.setSixHats(sixHats);
    	
    	return res;
    }

    public Hat delete(int id) {
    	Optional<Hat> hat = findById(id);
    	Hat res = getOne(id);
//        if(hat.isPresent()){
//        	hat = ;
//        	hatRepository.delete(hat);
//        }
        hat.ifPresent(ht -> hatRepository.delete(ht));
        if(hat.isPresent())
        	res = null;
        
        return res;
    }

	public List<Hat> findAll() {
        return hatRepository.findAll();
    }

    public Hat getOne(int id) {
        return hatRepository.getOne(id);
    }
    
    public Optional<Hat> findById(int id) {
        return hatRepository.findById(id);
    }

    public Hat update(Hat hat) {
        return null;
    }

	public Hat save(Hat hat) {
//		hat.getConclusions().stream()
//			.forEach(str -> {string = str; checkSafeHtml();});
		
		return hatRepository.save(hat);
	}
	
	// Other business methods -----------------------------------------------------------------
	
//	@SafeHtml
//	public String checkSafeHtml() {
//		return string;
//	}
//	
	public Collection<Hat> reassignHats(SixHats sixHats){
//		List<Hat> hatsBD = new ArrayList<Hat>(getHatsOfSixHats(sixHats.getId()));
		List<Hat> res = new ArrayList<Hat>(sixHats.getHats());
		
		if(res.isEmpty() || res == null) {
			res = new ArrayList<Hat>();
		}
		for(Hat hat : res) {
			int orden = hat.getOrden();
			if(orden < 5) {
				hat.setOrden(orden+1);
				//res.add(res.indexOf(hat), hat);
			}
			else {
				hat.setOrden(0);	
				//res.add(res.indexOf(hat), hat);
			}
//			for(Hat hatBD : hatsBD) {
//				if(hatBD.getId() == hat.getId())
//					hat.setVersion(hatBD.getVersion());
//			}
			
			this.save(hat);
		}
		
		return res;
	}
	
	public Collection<Hat> getHatsOfSixHats(int sixHatsId){
		Collection<Hat> res;
		
		res = hatRepository.getHatsOfSixHats(sixHatsId);
		
		return res;
	}


}

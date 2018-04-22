package drafter.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.domain.Hat;
import drafter.domain.HatConclusion;
import drafter.domain.SixHats;
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
    	Hat hat = findById(id);
//        if(hat.isPresent()){
//        	hat = ;
//        	hatRepository.delete(hat);
//        }
        if(hat != null) {
        	hatRepository.deleteById(hat.getId());
        }
        
        return hat;
    }

	public List<Hat> findAll() {
        return hatRepository.findAll();
    }

    public Hat findById(int id) {
        return hatRepository.getOne(id);
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

package drafter.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.beans.conclusion.ConclusionBean;
import drafter.beans.conclusion.ConclusionSerializer;
import drafter.domain.Agenda;
import drafter.domain.Conclusion;
import drafter.repositories.ConclusionRepository;

@Service
@Transactional
public class ConclusionService {
	
	//Repository-------------------------------------------------------------------------------

	@Autowired
	private ConclusionRepository conclusionRepository;
	
	@Autowired
	private AgendaService agendaService;


	//Constructor------------------------------------------------------------------------------

	public ConclusionService() {
		super();
	}
	

	//CRUD Methods------------------------------------------------------------------------------

    public Agenda create() {
        return new Agenda();
    }
    
    public Conclusion save(Conclusion conclusion) {
    	return conclusionRepository.save(conclusion);
    }
    
    public ConclusionBean saveBean(ConclusionBean conclusion) {
		Conclusion res = new ConclusionSerializer().fromBean(conclusion, agendaService, this);
    	return new ConclusionSerializer().fromConclusion(this.save(res));
    }

    public void delete(int id) {
    	Conclusion res = findById(id);
        if(res != null)
        	conclusionRepository.delete(res);
    }

	public List<Conclusion> findAll() {
        return conclusionRepository.findAll();
    }

    public Conclusion findById(int id) {
        return conclusionRepository.getOne(id);
    }

    
	//Other business Methods-----------------------------------------------------------------------------

    public List<Conclusion> findByAgenda(int agendaId) {
    	return conclusionRepository.findByAgenda(agendaId);
    }
}

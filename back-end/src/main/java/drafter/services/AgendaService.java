package drafter.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.domain.Agenda;
import drafter.repositories.AgendaRepository;

@Service
@Transactional
public class AgendaService {

	//Repository-------------------------------------------------------------------------------

	@Autowired
	private AgendaRepository agendaRepository;


	//Constructor------------------------------------------------------------------------------

	public AgendaService() {
		super();
	}
	

	//CRUD Methods------------------------------------------------------------------------------

    public Agenda create() {
        return new Agenda();
    }
    
    public Agenda save(Agenda agenda) {
    	return agendaRepository.save(agenda);
    }

    public void delete(int id) {
        Agenda res = findById(id);
        if(res != null)
        	agendaRepository.delete(res);
    }

	public List<Agenda> findAll() {
        return agendaRepository.findAll();
    }

    public Agenda findById(int id) {
        return agendaRepository.getOne(id);
    }

	//Other business Methods-----------------------------------------------------------------------------

	    
}

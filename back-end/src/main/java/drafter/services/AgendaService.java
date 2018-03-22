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
	private AgendaRepository	agendaRepository;

	//Constructor------------------------------------------------------------------------------

	public AgendaService() {
		super();
	}

	//CRUD Methods------------------------------------------------------------------------------

    public Agenda create(Agenda agenda) {
        return agendaRepository.save(agenda);
    }

    public Agenda delete(int id) {
    	Agenda agenda = findById(id);
        if(agenda != null){
        	agendaRepository.delete(agenda);
        }
        return agenda;
    }

	public List<Agenda> findAll() {
        return agendaRepository.findAll();
    }

    public Agenda findById(int id) {
        return agendaRepository.getOne(id);
    }

    public Agenda update(Agenda agenda) {
        return null;
    }

	public Agenda save(Agenda agenda) {
		return agendaRepository.save(agenda);
	}


}

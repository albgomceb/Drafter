package drafter.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import drafter.domain.Agenda;
import drafter.repositories.AgendaRepository;

public class AgendaService {

	
	@Autowired
	public AgendaRepository agendaRepository; 
	
	

	public AgendaService() {
	
	}
	
	public List<Agenda> findAll(){
		return agendaRepository.findAll(); 
	}
	
	public Agenda findById(int id) {
		return agendaRepository.getOne(id); 
		
	}

}

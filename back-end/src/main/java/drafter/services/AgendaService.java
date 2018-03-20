package drafter.services;

import java.util.Collection;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.domain.Agenda;
import drafter.domain.Meeting;
import drafter.repositories.AgendaRepository;

@Service
@Transactional
public class AgendaService {

	//Repository-------------------------------------------------------------------------------

	@Autowired
	private AgendaRepository	agendaRepository;
//	@Autowired
//	private MeetingRepository	meetingRepository;

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

	//Other business Methods-----------------------------------------------------------------------------

//    public Meeting addAgendaToMeeting(Collection<Agenda> agendas, int id) {
//    	Meeting meeting = meetingRepository.findById(id);
//    	meeting.setAgendas(agendas);
//    	
//    	meetingRepository.save(meeting);
//    	return meeting;
//    }
}

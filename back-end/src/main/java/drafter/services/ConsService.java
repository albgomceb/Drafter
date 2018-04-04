package drafter.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.domain.Cons;
import drafter.domain.Idea;
import drafter.repositories.ConsRepository;

@Service
@Transactional
public class ConsService {
	
	//Repository-------------------------------------------------------------------------------

	@Autowired
	private ConsRepository consRepository;


	//Constructor------------------------------------------------------------------------------

	public ConsService() {
		super();
	}
	

	//CRUD Methods------------------------------------------------------------------------------

    public Idea create() {
        return new Idea();
    }
    
    public Cons save(Cons cons) {
    	return consRepository.save(cons);
    }

    public void delete(int id) {
    	Cons res = findById(id);
        if(res != null)
        	consRepository.delete(res);
    }

	public List<Cons> findAll() {
        return consRepository.findAll();
    }

    public Cons findById(int id) {
        return consRepository.getOne(id);
    }

    
	//Other business Methods-----------------------------------------------------------------------------

    public List<Cons> findByIdea(int ideaId) {
    	return consRepository.findByIdea(ideaId);
    }
}

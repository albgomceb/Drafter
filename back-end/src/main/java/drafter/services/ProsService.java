package drafter.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.beans.pros.ProsBean;
import drafter.beans.pros.ProsSerializer;
import drafter.domain.Idea;
import drafter.domain.Pros;
import drafter.repositories.ProsRepository;

@Service
@Transactional
public class ProsService {
	
	//Repository-------------------------------------------------------------------------------

	@Autowired
	private ProsRepository prosRepository;
	
	@Autowired
	private IdeaService ideaService;


	//Constructor------------------------------------------------------------------------------

	public ProsService() {
		super();
	}
	

	//CRUD Methods------------------------------------------------------------------------------

    public Idea create() {
        return new Idea();
    }
    
    public Pros save(Pros pros) {
    	return prosRepository.save(pros);
    }
    
    public Pros saveBean(ProsBean bean) {
    	return prosRepository.save(new ProsSerializer().fromBean(bean, ideaService, this));
    }

    public void delete(int id) {
    	Pros res = findById(id);
        if(res != null)
        	prosRepository.delete(res);
    }

	public List<Pros> findAll() {
        return prosRepository.findAll();
    }

    public Pros findById(int id) {
        return prosRepository.getOne(id);
    }

    
	//Other business Methods-----------------------------------------------------------------------------

    public List<Pros> findByIdea(int ideaId) {
    	return prosRepository.findByIdea(ideaId);
    }
}
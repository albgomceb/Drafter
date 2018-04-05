package drafter.services;

import java.util.Collection;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import drafter.domain.Idea;
import drafter.repositories.IdeaRepository;

@Service
@Transactional
public class IdeaService {


	
	
	//Repository-------------------------------------------------------------------------------

	@Autowired
	private IdeaRepository ideaRepository;

	
	
	//Constructor------------------------------------------------------------------------------

	public IdeaService(IdeaRepository ideaRepository) {
		super();
		
	} 
	
	//CRUD Methods------------------------------------------------------------------------------

	public List<Idea> findAll(){
		return ideaRepository.findAll(); 
	}
	
	public Idea findById(int id) {
		return ideaRepository.getOne(id); 
	}
	
	public Collection<Idea> findIdeasByBSId(int idBS){
		
		Collection<Idea> ideas;
		ideas = ideaRepository.findIdeasByBSId(idBS);
		return ideas; 
		
	}
	
}

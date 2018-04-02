package drafter.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.domain.Idea;
import drafter.repositories.IdeaRepository;

@Service
@Transactional
public class IdeaService {
	// Repository-------------------------------------------------------------------------------

	@Autowired
	private IdeaRepository ideaRepository;

	// Constructor------------------------------------------------------------------------------

	public IdeaService() {
			super();
		}

	// CRUD Methods------------------------------------------------------------------------------

	public Idea create(Idea idea) {
		return ideaRepository.save(idea);
	}

	public Idea delete(int id) {
		Idea idea = findById(id);
		if (idea != null) {
			ideaRepository.delete(idea);
		}
		return idea;
	}

	public List<Idea> findAll() {
		return ideaRepository.findAll();
	}

	public Idea findById(Integer id) {
		return ideaRepository.findById(id).orElse(null);
	}

	public Idea update(Idea idea) {
		return null;
	}
	
	public Idea save(Idea idea) {
		return ideaRepository.save(idea);
	}
    public List<Idea> findByBrain(int id) {
        return ideaRepository.findByBrain(id);
    }
}

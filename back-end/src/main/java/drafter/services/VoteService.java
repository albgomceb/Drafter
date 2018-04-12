package drafter.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.domain.Vote;
import drafter.repositories.VoteRepository;

@Service
@Transactional
public class VoteService {
	// Repository-------------------------------------------------------------------------------

	@Autowired
	private VoteRepository voteRepository;

	// Constructor------------------------------------------------------------------------------

	public VoteService() {
		super();
	}

	// CRUD
	// Methods------------------------------------------------------------------------------

	public Vote create(Vote vote) {
		return voteRepository.save(vote);
	}

	public Vote delete(int id) {
		Vote vote = findById(id);
		if (vote != null) {
			voteRepository.delete(vote);
		}
		return vote;
	}

	public List<Vote> findAll() {
		return voteRepository.findAll();
	}

	public Vote findById(Integer id) {
		return voteRepository.findById(id).orElse(null);
	}

	public Vote update(Vote vote) {
		return null;
	}

	public Vote save(Vote vote) {
		Vote dbVote;
		dbVote = voteRepository.findByParticipantAndIdea(vote.getParticipant().getId(), vote.getIdea().getId());
		if (dbVote != null) {
			dbVote.setValue(vote.getValue());
			return voteRepository.save(dbVote);
		} else {
			return voteRepository.save(vote);
		}
	}
}

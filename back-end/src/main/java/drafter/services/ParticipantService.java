
package drafter.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.beans.Option;
import drafter.domain.Meeting;
import drafter.domain.Participant;
import drafter.domain.User;
import drafter.repositories.ParticipantRepository;

@Service
@Transactional
public class ParticipantService {

	//Repository-------------------------------------------------------------------------------

	@Autowired
	private ParticipantRepository	participantRepository;
	
	@Autowired
	private UserService userService;


	//Constructor------------------------------------------------------------------------------

	public ParticipantService() {
		super();
	}

	//CRUD Methods------------------------------------------------------------------------------

    public Participant create(Participant participant) {
        return participantRepository.save(participant);
    }

    public Participant delete(int id) {
        Participant participant = findById(id);
        if(participant != null){
        	participantRepository.delete(participant);
        }
        return participant;
    }

	public List<Participant> findAll() {
        return participantRepository.findAll();
    }

    public Participant findById(int id) {
        return participantRepository.getOne(id);
    }

    public Participant update(Participant participant) {
        return null;
    }
    
    public Participant save(Participant participant) {
    	return this.participantRepository.save(participant);
    }

	public void relateWithParticipants(Meeting result, List<Option> attendants) {
		attendants.stream().forEach(op -> {
				Participant part = new Participant();
				part.setRole(op.getRole());
				part.setHasAttended(false);
				User user = userService.findById(new Integer(op.getId()));
				part.setUser(user);
				result.addParticipant(part);
				save(part);
			});

		
	}
	public Participant findByMeetingAndUser(int meetingId){
		return this.participantRepository.findByMeetingAndUser(meetingId,userService.findByPrincipal().getId());
	}

	//Other business Methods-----------------------------------------------------------------------------


	/*public Participant findByPrincipal() {
		final UserAccount userAccount = LoginService.getPrincipal();
		final Participant participant = this.participantRepository.findByPrincipal(participantAccount.getId());
		Assert.isTrue(participant.getUserAccount().getUsername().equals(userAccount.getUsername()));
		return participant;
	}*/

	/*public Boolean isParticipant() {
		Boolean result = false;
		try {
			final Authority aut = new Authority();
			aut.setAuthority(Authority.USER);

			result = LoginService.getPrincipal().getAuthorities().contains(aut);
		} catch (final Exception e) {
			result = false;
		}
		return result;
	}*/

	/*public void register(final Participant participant) {
		Assert.notNull(participant);
		UserAccount userAccount;
		final Md5PasswordEncoder encoder = new Md5PasswordEncoder();
		userAccount = participant.getParticipantAccount();
		userAccount.setPassword(encoder.encodePassword(userAccount.getPassword(), null));
		participant.setUserAccount(userAccount);

		this.save(participant);

	}*/

}

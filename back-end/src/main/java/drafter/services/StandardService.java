
package drafter.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.domain.Standard;
import drafter.repositories.StandardRepository;

@Service
@Transactional
public class StandardService {

	//Repository-------------------------------------------------------------------------------

	@Autowired
	private StandardRepository	standardRepository;


	//Constructor------------------------------------------------------------------------------

	public StandardService() {
		super();
	}

	//CRUD Methods------------------------------------------------------------------------------

    public Standard create(Standard Standard) {
        return standardRepository.save(Standard);
    }

    public Standard delete(int id) {
        Standard Standard = findById(id);
        if(Standard != null){
        	standardRepository.delete(Standard);
        }
        return Standard;
    }

	public List<Standard> findAll() {
        return standardRepository.findAll();
    }

    public Standard findById(int id) {
        return standardRepository.getOne(id);
    }

    public Standard update(Standard Standard) {
        return null;
    }

	//Other business Methods-----------------------------------------------------------------------------


	/*public Standard findByPrincipal() {
		final StandardAccount StandardAccount = LoginService.getPrincipal();
		final Standard Standard = this.standardRepository.findByPrincipal(StandardAccount.getId());
		Assert.isTrue(Standard.getStandardAccount().getStandardname().equals(StandardAccount.getStandardname()));
		return Standard;
	}*/

	/*public Boolean isStandard() {
		Boolean result = false;
		try {
			final Authority aut = new Authority();
			aut.setAuthority(Authority.Standard);

			result = LoginService.getPrincipal().getAuthorities().contains(aut);
		} catch (final Exception e) {
			result = false;
		}
		return result;
	}*/

	/*public void register(final Standard Standard) {
		Assert.notNull(Standard);
		StandardAccount StandardAccount;
		final Md5PasswordEncoder encoder = new Md5PasswordEncoder();
		StandardAccount = Standard.getStandardAccount();
		StandardAccount.setPassword(encoder.encodePassword(StandardAccount.getPassword(), null));
		Standard.setStandardAccount(StandardAccount);

		this.save(Standard);

	}*/

}

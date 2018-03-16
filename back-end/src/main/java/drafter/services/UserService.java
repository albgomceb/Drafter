
package drafter.services;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import drafter.repositories.UserRepository;
import drafter.domain.User;

@Service
@Transactional
public class UserService {

	//Repository-------------------------------------------------------------------------------

	@Autowired
	private UserRepository	userRepository;


	//Constructor------------------------------------------------------------------------------

	public UserService() {
		super();
	}

	//CRUD Methods------------------------------------------------------------------------------

	public User create() {

		//final UserAccount userAccount = new UserAccount();
		//final Authority aut = new Authority();
		//aut.setAuthority(Authority.USER);
		//final Collection<Authority> authorities = userAccount.getAuthorities();
		//authorities.add(aut);
		//userAccount.setAuthorities(authorities);

		final User user = new User();
		//user.setUserAccount(userAccount);

		return user;

	}

	public User findOne(final Integer userId) {
		return this.userRepository.getOne(userId);
	}

	public Collection<User> findAll() {
		return this.userRepository.findAll();
	}

	@SuppressWarnings("deprecation")
	public User save(final User user) {
		Assert.notNull(user);;
		User saved;
		saved = this.userRepository.save(user);
		return saved;
	}

	public void delete(final User user) {
		this.userRepository.delete(user);
	}

	//Other business Methods-----------------------------------------------------------------------------


	/*public User findByPrincipal() {
		final UserAccount userAccount = LoginService.getPrincipal();
		final User user = this.userRepository.findByPrincipal(userAccount.getId());
		Assert.isTrue(user.getUserAccount().getUsername().equals(userAccount.getUsername()));
		return user;
	}*/

	/*public Boolean isUser() {
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

	/*public void register(final User user) {
		Assert.notNull(user);
		UserAccount userAccount;
		final Md5PasswordEncoder encoder = new Md5PasswordEncoder();
		userAccount = user.getUserAccount();
		userAccount.setPassword(encoder.encodePassword(userAccount.getPassword(), null));
		user.setUserAccount(userAccount);

		this.save(user);

	}*/

}

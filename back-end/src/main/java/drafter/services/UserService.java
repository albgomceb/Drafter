
package drafter.services;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import drafter.domain.Organization;
import drafter.domain.User;
import drafter.repositories.UserRepository;
import drafter.security.LoginService;
import drafter.security.UserAccount;

@Service
@Transactional
public class UserService {

	//Repository-------------------------------------------------------------------------------

	@Autowired
	private UserRepository	userRepository;
	
	@Autowired
	private LoginService loginService;
	
	@Autowired
	private OrganizationService organizationService;


	//Constructor------------------------------------------------------------------------------

	public UserService() {
		super();
	}

	//CRUD Methods------------------------------------------------------------------------------

    public User create(User user) {
        return userRepository.save(user);
    }

    public User delete(int id) {
        User user = findById(id);
        if(user != null){
        	userRepository.delete(user);
        }
        return user;
    }

	public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    public User update(User user) {
        return null;
    }

    public User save(User user) {
        return userRepository.save(user);
    }

	//Other business Methods-----------------------------------------------------------------------------

    public User findByEmail(String email) {
    	return userRepository.findByEmail(email);
    }
    
    public User findByUsername(String username) {
    	return userRepository.findByUsername(username);
    }

	public User findByPrincipal() {
		final UserAccount userAccount = loginService.getPrincipal();
		final User user = this.userRepository.findByUserAccount(userAccount.getId());
		Assert.isTrue(user.getUserAccount().getUsername().equals(userAccount.getUsername()), "Invalid user name!");
		return user;
	}
	
	public List<User> filterUsers(String keyword, String department){
		return userRepository.filterUsers(keyword, department);
	}
	
	public List<User> filterUsers2(String keyword){
		return userRepository.filterUsers2(keyword);
	}

	public List<User> findAllWithoutPrincipal(int id) {
		return userRepository.findAllWithoutPrincipal(id);
	}
	
	public boolean hasPay(int organizationId) {
		return hasPay(organizationService.findById(organizationId));
	}
	
	public boolean hasPay(Organization organization) {
		User owner = organization.getUser();
		return owner.getLastPay() != null && owner.getLastPay().getTime() > System.currentTimeMillis() - 2628000000L;
	}
	
	public boolean principalHasPay() {
		User me = findByPrincipal();
		return me.getLastPay() != null && me.getLastPay().getTime() > System.currentTimeMillis() - 2628000000L;
	}
	
	public void pay() {
		User me = findByPrincipal();
		me.setLastPay(new Date(System.currentTimeMillis()));
		userRepository.save(me);
	}

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

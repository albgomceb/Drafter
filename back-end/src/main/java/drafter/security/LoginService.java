package drafter.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class LoginService implements UserDetailsService {
	
	// Managed repository -----------------------------------------------------

	@Autowired
	UserAccountRepository userRepository;
	
	// Business methods -------------------------------------------------------

	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {
		//Assert.assertNotNull(username);

		UserDetails result;

		result = userRepository.findByUsername(username);
		//Assert.assertNotNull(result);		
		// WARNING: The following sentences prevent lazy initialisation problems!
		//Assert.assertNotNull(result.getAuthorities());
		result.getAuthorities().size();

		return result;
	}

	public static UserAccount getPrincipal() {
		UserAccount result;
		SecurityContext context;
		Authentication authentication;
		Object principal;

		// If the asserts in this method fail, then you're
		// likely to have your Tomcat's working directory
		// corrupt. Please, clear your browser's cache, stop
		// Tomcat, update your Maven's project configuration,
		// clean your project, clean Tomcat's working directory,
		// republish your project, and start it over.

		context = SecurityContextHolder.getContext();
		//Assert.assertNotNull(context);
		authentication = context.getAuthentication();
		//Assert.assertNotNull(authentication);
		principal = authentication.getPrincipal();
		//Assert.assertTrue(principal instanceof UserAccount);
		result = (UserAccount) principal;
		//Assert.assertNotNull(result);
		//Assert.assertTrue(result.getId() != 0);

		return result;
	}

}

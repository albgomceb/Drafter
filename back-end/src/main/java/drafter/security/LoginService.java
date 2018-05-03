package drafter.security;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
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
	UserAccountRepository userAccountRepository;
	
	// Business methods -------------------------------------------------------

	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		UserAccount account = userAccountRepository.findByUsername(username);
		UserDetails userDetails = null;
		
		if(account != null) {
			Set<GrantedAuthority> grantedAuthorities = new HashSet<GrantedAuthority>();
			account.getAuthorities()
				   .stream()
				   .forEach(x -> grantedAuthorities.add(new SimpleGrantedAuthority(x.getAuthority())));
			
			userDetails = new User(account.getUsername(), account.getPassword(), grantedAuthorities);
		}
		
		return userDetails;
	}

	public UserAccount getPrincipal() {
		UserAccount result = null;
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
		try {
		result = findByEmailAndPassword(principal.toString()).getUserAccount();
		} catch (Exception e){
			throw new NullPointerException("Error login.");
		}
		//Assert.assertNotNull(result);
		//Assert.assertTrue(result.getId() != 0);

		return result;
	}
	
	public drafter.domain.User findByEmailAndPassword(String email) {
		drafter.domain.User res = userAccountRepository.findByEmailAndPassword(email);
		return res;
	}

}

package drafter.beans.user2;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

import drafter.domain.Department;
import drafter.domain.Organization;
import drafter.domain.User;
import drafter.security.Authority;
import drafter.security.UserAccount;
import drafter.services.UserService;

public class UserSerializer2 {

	public UserService userService;
	
	public UserSerializer2 (UserService userService2) {
		this.userService = userService2;
	}
	
	public UserBean2 fromUser(User user) {
		UserBean2 res = new UserBean2();
		res.setPassword(user.getUserAccount().getPassword());
		res.setEmail(user.getEmail());
		res.setUsername(user.getUserAccount().getUsername());
		res.setName(user.getName());
		res.setSurname(user.getSurname());
		
		return res;
	}
	
	public User fromBean(UserBean2 user) {
		User res = new User();
		
		res.setEmail(user.getEmail());
		res.setName(user.getEmail());
		res.setOrganizations(new ArrayList<Organization>());
		res.setDepartments(new ArrayList<Department>());
		res.setPhone("666666666"); //TODO: Cambiar numero por defecto. Creo que no es ni necesario.
		res.setPhoto("");
		res.setSurname(user.getSurname());
		
		UserAccount ua = new UserAccount();
		List<Authority> authorities = new ArrayList<Authority>();
		Authority au = new Authority();
		au.setAuthority("USER");
		authorities.add(au);
		ua.setAuthorities(authorities);
		ua.setUsername(user.getUsername());
		ua.setPassword(encodePassword(user.getPassword()));
		
		res.setUserAccount(ua);
		
		return res;
		
	}
	
	private String encodePassword(String password) {
		//Para coger el password y codificarlo para compararlo con el de la base de datos
	    MessageDigest m = null;
		try {
			m = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
	    m.update(password.getBytes(),0,password.length());
	    String res = new BigInteger(1,m.digest()).toString(16);
	    return res;
	}
}

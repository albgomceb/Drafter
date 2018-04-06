package drafter.beans.login;

import drafter.domain.User;
import drafter.security.LoginService;
import drafter.services.UserService;

public class LoginSerializer {

	public UserService userService;
	public LoginService loginService;
	
	public LoginSerializer (UserService userService2) {
		this.userService = userService2;
	}
	
	public LoginBean fromUser(User user) {
		LoginBean res = new LoginBean();
		res.setPassword(user.getUserAccount().getPassword());
		res.setEmail(user.getEmail());
		
		return res;
	}
	
//	public User fromBean(LoginBean login) {
//		User res = loginService.findByEmailAndPassword(login.getEmail(), login.getPassword());
//		
//		return res;
//		
//	}
}

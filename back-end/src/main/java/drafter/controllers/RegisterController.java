//package drafter.controllers;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import drafter.beans.login.LoginBean;
//import drafter.beans.user2.UserBean2;
//import drafter.beans.user2.UserSerializer2;
//import drafter.domain.User;
//import drafter.security.LoginService;
//import drafter.services.UserService;
//
//@CrossOrigin(origins = "*", allowedHeaders = "*")
//@RestController
//@RequestMapping("/data/users")
//public class RegisterController {
//	
//	@Autowired
//	private UserService userService;
//	
//	@Autowired
//	private LoginService loginService;
//	
//	@PostMapping("/")
//	public UserBean2 register(@RequestBody UserBean2 user) {
//		System.out.print("Ha entrado en data/users/ -> register");
//		UserSerializer2 serializer = new UserSerializer2(userService);
//		User result = serializer.fromBean(user); //Pasa de userBean a user
//		result = userService.create(result); //Crea un usuario
//		UserBean2 res = serializer.fromUser(result); //Pasa de user a userBean
//		
//		return res;
//	}
//	
//	@PostMapping("/login")
//	public Boolean login(@RequestBody LoginBean login) {
//		System.out.print("Ha entrado en data/users/ -> login");
//		Boolean res = false;
//		User user = loginService.findByEmailAndPassword(login.getEmail(), login.getPassword());
//		if(user != null)
//			res = true;
//		
//		System.out.println(user.getName());
//		System.out.println(user.getSurname());
//		return res;
//	}
//	
//	
//
//}

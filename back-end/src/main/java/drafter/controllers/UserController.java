package drafter.controllers;
 
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.UserBean;
import drafter.beans.user.UserSerializer;
import drafter.domain.User;
import drafter.services.UserService;
 
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping({"users"})
public class UserController {
	
	@Autowired
	private UserService	userService;
 
	
	@RequestMapping(value = "/", produces = {"application/json"}, method = RequestMethod.GET)
//	@ResponseBody
    public List<UserBean> findAll(){
		List<User> res = this.userService.findAll(); 
		System.out.println(res.getClass().getSimpleName());
		List<UserBean> result = res.stream()
		.map(user -> UserSerializer.fromUser(user))
		.collect(Collectors.toList());
		
        return result;
    }
	
	@RequestMapping(value = "/", produces = {"application/json"}, method = RequestMethod.POST)
//	@ResponseBody
	public String save(UserBean user){
		User result = UserSerializer.fromBean(user);
		System.out.println(result);
		
		return "";
	}
	
	
	
}
package drafter.controllers;
 
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.domain.User;
import drafter.services.UserService;
 
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping({"/getUsers"})
public class UserController {
	
	@Autowired
	private UserService	userService;
 
	
	@SuppressWarnings("rawtypes")
	@GetMapping
    public List findAll(){
		
		@SuppressWarnings("unchecked")
		List<User> users = new ArrayList<User>(this.userService.findAll());
		
		for(User u:users) {
			System.out.println(u);
		}
		
        return this.userService.findAll();
    }
	
}
package drafter.controllers;
 
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import drafter.domain.User;
import drafter.services.UserService;
 
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping({"/user"})
public class UserController {
	
	@Autowired
	private UserService	userService;
 
	
	@RequestMapping(value = "/list", produces = {"application/JSON"})
	@ResponseBody
    public List<User> findAll(){
        return this.userService.findAll();
    }
	
}
package drafter.controllers;
 
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import drafter.domain.User;
import drafter.services.UserService;
 
@Controller
public class UserController {
	
	@Autowired
	private UserService	userService;
 
	@RequestMapping("/")
	@ResponseBody
	String home() {
		 
		final List<User> users = new ArrayList<User>(this.userService.findAll());
		final Gson gson = new GsonBuilder().setPrettyPrinting().create();
		final String userJson = gson.toJson(users);
		for (User u:users) {
			System.out.println(u);
		}
		
		return userJson;
		
	}
	
}
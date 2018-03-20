package drafter.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.user.UserBean;
import drafter.beans.user.UserSerializer;
import drafter.domain.User;
import drafter.services.UserService;

@CrossOrigin
@RestController
@RequestMapping("/data/users")
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping("")
	public List<UserBean> findAll() {
		List<User> res = this.userService.findAll();
		List<UserBean> result = res.stream().map(user -> UserSerializer.fromUser(user)).collect(Collectors.toList());

		return result;
	}

	@PostMapping("/")
	public String save(UserBean user) {
		User result = UserSerializer.fromBean(user);
		System.out.println(result);

		return "";
	}

}
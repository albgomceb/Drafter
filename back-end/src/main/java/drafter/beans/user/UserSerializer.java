package drafter.beans.user;

import java.util.List;
import java.util.stream.Collectors;

import drafter.beans.Option;
import drafter.domain.User;

public class UserSerializer {

	
	public static UserBean fromUser(User user) {
		UserBean res = new UserBean();
		List<Option> depar = user.getDepartments()
			.stream()
			.map(us -> new Option(new Integer(us.getId()).toString(),us.getName(),us.getOrganization().getEnterprise()))
			.collect(Collectors.toList()); 
		res.setDepartments(depar);
		res.setEmail(user.getEmail());
		res.setName(user.getName());
		res.setPhone(user.getPhone());
		res.setPhoto(user.getPhoto());
		res.setSurname(user.getSurname());
		
		return res;
	}
	
	public static User fromBean(UserBean user) {
		return null;
	}
}

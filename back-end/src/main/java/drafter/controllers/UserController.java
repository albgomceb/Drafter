package drafter.controllers;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.login.LoginBean;
import drafter.beans.user.UserBean;
import drafter.beans.user.UserSerializer;
import drafter.beans.user2.UserBean2;
import drafter.beans.user2.UserSerializer2;
import drafter.domain.User;
import drafter.security.Authority;
import drafter.security.LoginService;
import drafter.security.UserAccount;
import drafter.services.UserService;

@CrossOrigin
@RestController
@RequestMapping("/data/users")
public class UserController extends AbstractController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private LoginService loginService;

	@GetMapping("")
	public List<UserBean> findAll() {
		List<User> res = this.userService.findAll();
		List<UserBean> result = res.stream().map(user -> UserSerializer.fromUser(user)).collect(Collectors.toList());

		return result;
	}
	
	@GetMapping("/filterUsers")
	public List<UserBean> filterUsers(@RequestParam("search") String keyword) {	
		List<User> res;
		if(keyword==null || keyword=="" || keyword.length()==0) {
			res = this.userService.findAll();
		}else {
			res = this.userService.filterUsers(keyword);	
		}
		
		List<UserBean> result = res.stream().map(user -> UserSerializer.fromUser(user)).collect(Collectors.toList());
		
		return result;
	}
	
	//Parte de registrar y logear. El logeo no tiene seguridad actualmente.
	@SuppressWarnings("deprecation")
	@PostMapping("/")
	public Object register(@RequestBody UserBean2 user) {
		User isUser = userService.findByEmail(user.getEmail());
		
		try {
			Assert.isTrue(todoCompleto(user) == true, "Se han enviado todos los campos");
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.HTTP_VERSION_NOT_SUPPORTED);
		}
		
		try {
			Assert.isTrue(user.getUsername().length() >= 5, "El usuario tiene al menos 5 o más caracteres.");
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.METHOD_FAILURE);
		}
		
		try {
			Assert.isTrue(emailCorrecto(user.getEmail()) == true, "El email tiene la estructura correcta");
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.LOOP_DETECTED);
		}
		
		try {
			Assert.isTrue(isUser == null || user.getPassword().length() >= 5, "El correo"
					+ " está libre y la contraseña tiene 5 o más caracteres");
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.BANDWIDTH_LIMIT_EXCEEDED);
		}
		
		try {
			Assert.isTrue(isUser == null, "El correo está libre.");
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.FAILED_DEPENDENCY);
		}
		
		try {
			Assert.isTrue(user.getPassword().length() >= 5, "La contraseña tiene 5 o más caracteres.");
		} catch (Exception e) {
			return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);
		}
		
		if(isUser == null && todoCompleto(user) == true) {
			UserSerializer2 serializer = new UserSerializer2(userService);
			User result = serializer.fromBean(user); //Pasa de userBean a user
			result = userService.create(result); //Crea un usuario
			UserBean2 res = serializer.fromUser(result); //Pasa de user a userBean
			SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(result.getEmail(), 
					result.getUserAccount().getPassword(), 
					result.getUserAccount().getAuthorities()));
			return res;
		}
		else {
			return null;
		}
		
	}
	
	private boolean emailCorrecto(String email) {
        Pattern pattern = Pattern
                .compile("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
                        + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
  
        Matcher mather = pattern.matcher(email);
 
        //Si matcher.find() == true significa que el email es valido
        if (mather.find() == true) {
           return true;
        } else {
            return false;
        }
	}

	private boolean todoCompleto(UserBean2 user) {
		//Comprobar que todos los campos tienen texto (username minimo 5, email con estructura de email). Devolver true si es cierto.
		if(user.getEmail().trim() == "" ||
				user.getName().trim() == "" ||
				user.getPassword().trim() == ""||
				user.getSurname().trim() == "" ||
				user.getUsername().trim() == "") {
			return false;
		}
		else {
			return true;
		}
	}

	@PostMapping("/login")
	public Object login(@RequestBody LoginBean login) {
		
		User user = loginService.findByEmailAndPassword(login.getEmail());
		if(user == null) {
			return new ResponseEntity<Object>(HttpStatus.FAILED_DEPENDENCY);
		}
		else {
			UserAccount account = user.getUserAccount();
			UserDetails userDetails = null;
			
			String passwordEncode = encodePassword(login.getPassword());
			try {
				Assert.isTrue(passwordEncode.equals(account.getPassword()), "La contraseña coincide");
			} catch (Exception e) {
				return new ResponseEntity<Object>(HttpStatus.FAILED_DEPENDENCY);
			}
			
			if(account!=null) {
				List<Authority> authorities = new ArrayList<Authority>();
				Authority auth = new Authority();
				auth.setAuthority(Authority.USER);
				authorities.add(auth);
				SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword(), authorities));
			}		
			return userDetails;
		}
	}
	
	@GetMapping("/logout")
	public String logout() {
		SecurityContextHolder.clearContext();
		return "";
	}
	
	@GetMapping("/me")
	public UserBean me() {
		return UserSerializer.fromUser(userService.findByPrincipal());
	}

//	private boolean existeEmail(String email) {
//		Boolean res = false;
//		User user = userService.findByEmail(email);
//		if(user!=null)
//			res = true;
//		return res;
//	}

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
package drafter.controllers;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AbstractController {
	
	@ExceptionHandler(Throwable.class)
	public String internalError(Throwable oops) {
		return oops.getLocalizedMessage();
	}	

}

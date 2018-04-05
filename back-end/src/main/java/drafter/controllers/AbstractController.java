package drafter.controllers;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AbstractController {
	
	@ExceptionHandler(Throwable.class)
	public String internalError(HttpServletResponse response, Throwable oops) {
		response.setStatus(500);
		return oops.getLocalizedMessage();
	}
	
	@ExceptionHandler(EntityNotFoundException.class)
	public String notEntityFound(HttpServletResponse response, Throwable oops) {
		response.setStatus(404);
		return "Resource not found!";
	}

}

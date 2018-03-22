package drafter.controllers;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.PopulateDatabase;

@CrossOrigin
@RestController
public class PopulateController {
	
	@Autowired
	private PopulateDatabase populate;
	
	@GetMapping("/populate")
	public void populaye(HttpServletResponse response) throws IOException {
		populate.populate();
		response.sendRedirect("/");
	}
}
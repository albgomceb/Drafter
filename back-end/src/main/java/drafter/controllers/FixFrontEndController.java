
package drafter.controllers;

import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class FixFrontEndController implements ErrorController {

    private static final String PATH = "/error";

    @GetMapping(PATH)
    public String error(HttpServletRequest request, HttpServletResponse response) throws Exception {
    	if(response.getStatus() == 404) {
	    	StringBuilder sb = new StringBuilder();
	    	response.setStatus(200);
	    	for(String s : Files.readAllLines(Paths.get(this.getClass().getResource("/static/index.html").toURI()), Charset.forName("UTF-8"))) {
	    		sb.append(s);
	    	}
	    	
	    	return sb.toString();
    	} else
    		return "";
    }

    @Override
    public String getErrorPath() {
        return PATH;
    }

}
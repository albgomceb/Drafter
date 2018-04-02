
package drafter.controllers;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class FixFrontEndController implements ErrorController {
	
    private static final String PATH = "/error";

    @GetMapping(PATH)
    public String error(HttpServletRequest request, HttpServletResponse response) throws Exception {
    	if(response.getStatus() == 404) {
	    	response.setStatus(200);
	    	return read(new ClassPathResource("static/index.html").getInputStream());
    	} else
    		return "";
    }
    
	private String read(InputStream in) throws IOException {
		ByteArrayOutputStream result = new ByteArrayOutputStream();
		byte[] buffer = new byte[1024];
		int length;
		while((length = in.read(buffer)) != -1)
			result.write(buffer, 0, length);

		return result.toString(StandardCharsets.UTF_8.name());
	}

    @Override
    public String getErrorPath() {
        return PATH;
    }

}
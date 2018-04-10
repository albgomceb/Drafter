
package drafter.controllers;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.sixHats.SixHatsBean;
import drafter.beans.sixHats.SixHatsSerializer;
import drafter.domain.Hat;
import drafter.domain.Meeting;
import drafter.domain.SixHats;
import drafter.services.MeetingService;
import drafter.services.SixHatsService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/data/sixHats")
public class SixHatsController {

	@Autowired
	private SixHatsService sixHatsService;
	
	@Autowired
	private MeetingService	meetingService;
	

	@GetMapping("/{meetingId}")
	public SixHatsBean findMeeting(@PathVariable("meetingId")Integer meetingId) {
		SixHats res = this.sixHatsService.findById(meetingId);
		if(res.getHats().isEmpty()) {
			
			res = sixHatsService.create(res);

		}
		SixHatsBean result = new SixHatsSerializer().fromSixHats(res);

		return result;
	}
	
	@PostMapping("/{meetingId}")
	public SixHatsBean save(@PathVariable("meetingId") int meetingId, @RequestBody SixHatsBean sixHats) {
		Meeting meeting = sixHatsService.findById(new Integer(meetingId));
		SixHats result = new SixHatsSerializer().fromBean(sixHats, meeting);
		result.setHats(sixHatsService.reassignHats(result));
		sixHatsService.save(result);
		SixHatsBean res =new SixHatsSerializer().fromSixHats(result);
		
		return res;
	}

}
package drafter.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.vote.VoteBean;
import drafter.beans.vote.VoteSerializer;
import drafter.domain.Vote;
import drafter.services.VoteService;

@CrossOrigin
@RestController
@RequestMapping("/data/votes")
public class VoteController {
	
	@Autowired
	private VoteService voteService;
	
	@GetMapping("")
	public List<VoteBean> findAll() {
		List<Vote> res = this.voteService.findAll();
		List<VoteBean> result = res.stream().map(vote -> new VoteSerializer().fromVote(vote)).collect(Collectors.toList());

		return result;
	}
	
	@PostMapping("/{ideaId}")
	public List<VoteBean> save(@RequestBody ArrayList<VoteBean> votes) {
		List<Vote> result = new VoteSerializer().fromBean(votes);
		result.stream().forEach(i -> {
			
			voteService.save(i);	
		});
		List<VoteBean> res = result.stream().map(vote -> new VoteSerializer().fromVote(vote)).collect(Collectors.toList());
		
		return res;
	}
}

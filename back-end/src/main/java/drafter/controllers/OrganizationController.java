package drafter.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.agenda.AgendaBean;
import drafter.beans.agenda.AgendaSerializer;
import drafter.beans.organization.OrganizationBean;
import drafter.beans.organization.OrganizationSerializer;
import drafter.domain.Agenda;
import drafter.domain.Meeting;
import drafter.domain.Organization;
import drafter.domain.User;
import drafter.services.OrganizationService;
import drafter.services.UserService;

@CrossOrigin
@RestController
@RequestMapping("/data/organization")
public class OrganizationController {

	@Autowired
	private OrganizationService organizationService;
	
	@Autowired
	private UserService	userService;

	@GetMapping("/list")
	public List<OrganizationBean> findAll() {
		List<Organization> res = this.organizationService.findAll();
		List<OrganizationBean> result = res.stream().map(organization -> new OrganizationSerializer().fromOrganization(organization)).collect(Collectors.toList());

		return result;
	}
	
	@PostMapping("/{userId}")
	public OrganizationBean save(@PathVariable("userId") int userId, @RequestBody OrganizationBean organizationBean){
		User user = userService.findById(new Integer(userId));
		Organization result = new OrganizationSerializer().fromBean(organizationBean, user);
		
		organizationService.save(result);
		OrganizationBean res = new OrganizationSerializer().fromOrganization(result);
		
		return res;
	}
	
}
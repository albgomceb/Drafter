package drafter.controllers;

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

import drafter.beans.organization.OrganizationBean;
import drafter.beans.organization.OrganizationSerializer;
import drafter.domain.Organization;
import drafter.domain.User;
import drafter.services.OrganizationService;
import drafter.services.UserService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
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
	
	@GetMapping("/list/{userId}")
	public List<OrganizationBean> findByUser(@PathVariable("userId") int userId) {
		User user = userService.findById(new Integer(userId));
		User userLogued = userService.findByPrincipal();
		if(!userLogued.equals(user)) {
			return null;
		}
		List<Organization> res = this.organizationService.findByUserId(userId);
		List<OrganizationBean> result = res.stream().map(organization -> new OrganizationSerializer().fromOrganization(organization)).collect(Collectors.toList());

		return result;
	}
	
	@PostMapping("/{userId}")
	public OrganizationBean save(@PathVariable("userId") int userId, @RequestBody OrganizationBean organizationBean){
//		Organization old = null;
//		if(new Integer(organizationBean.getId()) > 0) { // Cojo la organización justo antes de ser modificada
//			old = organizationService.findById(new Integer(organizationBean.getId()));
//		}
		
		Organization result = organizationService.saveBean(organizationBean, userId);
//		organizationService.deleteDepartment(organizationBean, result, old);
		
		OrganizationBean res = new OrganizationSerializer().fromOrganization(result);
		
		return res;
	}
	
	@GetMapping("/{organizationId}")
	public OrganizationBean getOrganization(@PathVariable("organizationId") int organizationId) {
		Organization organization = this.organizationService.findById(organizationId);
		User user = userService.findByPrincipal();
		if(!user.getOrganizations().contains(organization)) {
			return null;
		}
		OrganizationBean result = new OrganizationSerializer().fromOrganization(organization);

		return result;
	}
	
}
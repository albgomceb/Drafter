package drafter.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import drafter.beans.organization.OrganizationBean;
import drafter.beans.organization.OrganizationSerializer;
import drafter.domain.Organization;
import drafter.services.OrganizationService;

@CrossOrigin
@RestController
@RequestMapping("/data/organization")
public class OrganizationController {

	@Autowired
	private OrganizationService organizationService;

	@GetMapping("/list")
	public List<OrganizationBean> findAll() {
		List<Organization> res = this.organizationService.findAll();
		List<OrganizationBean> result = res.stream().map(organization -> OrganizationSerializer.fromOrganization(organization)).collect(Collectors.toList());

		return result;
	}
	
}
package drafter.beans.organization;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import drafter.beans.Option;
import drafter.domain.Department;
import drafter.domain.Organization;
import drafter.domain.User;

public class OrganizationSerializer {
	
	public OrganizationBean fromOrganization(Organization organization) {
		OrganizationBean res = new OrganizationBean();
		List<Option> depar = organization.getDepartments()
			.stream()
			.map(or -> new Option(new Integer(or.getId()).toString(),or.getName()))
			.collect(Collectors.toList()); 
		res.setDepartments(depar);
		res.setEnterprise(organization.getEnterprise());
		res.setDescription(organization.getDescription());
		res.setAddress(organization.getAddress());
		res.setPhone(organization.getPhone());
		res.setEmail(organization.getEmail());
		res.setLogo(organization.getLogo());
		res.setId(new Integer(organization.getId()).toString());
		return res;
	}
	
	public Organization fromBean(OrganizationBean organizationBean, User user) {
		Organization organization = new Organization();
		
		organization.setEnterprise(organizationBean.getEnterprise());
		organization.setDescription(organizationBean.getDescription());
		organization.setAddress(organizationBean.getAddress());
		organization.setEmail(organizationBean.getEmail());
		organization.setPhone(organizationBean.getPhone());
		organization.setLogo(organizationBean.getLogo());
		
		Collection<Department> departments = new ArrayList<Department>();
		for(Option d: organizationBean.departments) {
			Department department = new Department();
			department.setName(d.getName());
			departments.add(department);
			department.setUsers(new ArrayList<User>());
			department.setOrganization(organization);
		}
		
		organization.setDepartments(departments);
		organization.setUser(user);
		
		return organization;
	}
}

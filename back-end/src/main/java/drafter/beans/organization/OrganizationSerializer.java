package drafter.beans.organization;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import drafter.beans.Option;
import drafter.domain.Department;
import drafter.domain.Organization;
import drafter.domain.User;
import drafter.services.DepartmentService;
import drafter.services.OrganizationService;
import drafter.services.UserService;

public class OrganizationSerializer {
	
	public OrganizationBean fromOrganization(Organization organization) {
		OrganizationBean res = new OrganizationBean();
		List<Option> depar = organization.getDepartments()
			.stream()
			.map(or -> new Option(new Integer(or.getId()).toString(),or.getName(),or.getWorkers()))
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
	
	public Organization fromBean(OrganizationBean organizationBean, User user, UserService userService,
			OrganizationService organizationService, DepartmentService departmentService) {
		Organization organization = new Organization();
		if(organizationBean.id != null && new Integer(organizationBean.id) > 0) {
			organization = organizationService.findById(new Integer(organizationBean.id));
		}
		
		organization.setEnterprise(organizationBean.getEnterprise());
		organization.setDescription(organizationBean.getDescription());
		organization.setAddress(organizationBean.getAddress());
		organization.setEmail(organizationBean.getEmail());
		organization.setPhone(organizationBean.getPhone());
		organization.setLogo(organizationBean.getLogo());
		
		Collection<Department> departments = new ArrayList<Department>();
		if(organizationBean.id != null && new Integer(organizationBean.id) > 0) { // Si estoy editando
			// For clásico para manterner el orden de los departamentos
			for(int i=organizationBean.departments.size()-1; i >= 0 ; i--) {
				int departmentId = new Integer(organizationBean.departments.get(i).getId());
				Department department = new Department();
				if(departmentId > 0) { // En el caso de que se esté añadiendo otro departamento más, NO entro aquí
					department = departmentService.findById(departmentId);
				}
				department.setName(organizationBean.departments.get(i).getName());
				
				List<User> users = new ArrayList<User>();
				for(Option u: organizationBean.departments.get(i).users) {
					User newUser = userService.findById(new Integer(u.id));
					
					users.add(newUser);
				}
				department.setWorkers(users);
				
				department.setOrganization(organization);
				departments.add(department);
			}
		}else { // Si estoy creando una organización nueva
			for(Option d: organizationBean.departments) { // Para que meta en el orden correcto los departamentos
				Department department = new Department();
				department.setName(d.getName());
				
				List<User> users = new ArrayList<User>();
				for(Option u: d.users) {
					User newUser = userService.findById(new Integer(u.id));
					
					users.add(newUser);
				}
				department.setWorkers(users);
				
				department.setOrganization(organization);
				departments.add(department);
			}
		}
		
		organization.setDepartments(departments);
		organization.setUser(user);
		
		return organization;
	}
}

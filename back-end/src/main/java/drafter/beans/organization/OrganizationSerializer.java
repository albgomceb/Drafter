package drafter.beans.organization;

import java.util.List;
import java.util.stream.Collectors;

import drafter.beans.Option;
import drafter.domain.Organization;

public class OrganizationSerializer {

	
	public static OrganizationBean fromOrganization(Organization organization) {
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
	
	public static Organization fromBean(OrganizationBean organization) {
		return null;
	}
}

package drafter.beans.organization;

import java.util.List;

import drafter.beans.Option;

public class OrganizationBean {

	public String id;
	public String enterprise; 
	public String description; 
	public  String address; 
	public  String phone; 
	public String email;
	public String logo;
	public List<Option> departments;
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getEnterprise() {
		return enterprise;
	}
	public void setEnterprise(String enterprise) {
		this.enterprise = enterprise;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getLogo() {
		return logo;
	}
	public void setLogo(String logo) {
		this.logo = logo;
	}
	public List<Option> getDepartments() {
		return departments;
	}
	public void setDepartments(List<Option> departments) {
		this.departments = departments;
	}
	
}

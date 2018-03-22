package drafter.beans.user;

import java.util.List;

import drafter.beans.Option;

public class UserBean {

	public String id;
	public String name; 
	public String surname; 
	public  String email; 
	public  String phone; 
	public String photo;
	public List<Option> departments;
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public List<Option> getDepartments() {
		return departments;
	}
	public void setDepartments(List<Option> departments) {
		this.departments = departments;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	
	
}

package drafter.beans.user;

import java.util.List;

import drafter.beans.Option;

public class UserBean {

	private String id;
	private String name; 
	private String surname; 
	private String email; 
	private String phone; 
	private String photo;
	private String username;
	private List<Option> departments;
	private List<String> authorities;
	
	
	public List<String> getAuthorities() {
		return authorities;
	}
	public void setAuthorities(List<String> authority) {
		this.authorities = authority;
	}
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
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	
}

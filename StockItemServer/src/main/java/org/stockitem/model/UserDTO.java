package org.stockitem.model;

public class UserDTO {

	private String name;

	private String alamat;

	private String role;
	private String username;
	private String password;

	private  String img;

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}


	public UserDTO(){

	}


	public UserDTO(String role) {
		this.role = role;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAlamat() {
		return alamat;
	}

	public void setAlamat(String alamat) {
		this.alamat = alamat;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
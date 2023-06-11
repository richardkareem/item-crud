package org.stockitem.model_jwt;

import java.io.Serializable;

public class JwtResponse implements Serializable {

	private static final long serialVersionUID = -8091879091924046844L;
	private final String jwttoken;
	private String role;
	private long id;
	private  String name;
	private String alamat;



	public JwtResponse(String jwttoken, String role, long id, String name, String alamat){

		this.jwttoken = jwttoken;
		this.role = role;
		this.id = id;
		this.name = name;
		this.alamat = alamat;

	}

	public String getAlamat() {
		return alamat;
	}

	public void setAlamat(String alamat) {
		this.alamat = alamat;
	}

	public long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getToken() {
		return this.jwttoken;
	}
}
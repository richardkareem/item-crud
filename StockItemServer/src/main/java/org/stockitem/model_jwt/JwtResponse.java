package org.stockitem.model_jwt;

import java.io.Serializable;

public class JwtResponse implements Serializable {

	private static final long serialVersionUID = -8091879091924046844L;
	private final String jwttoken;
	private  String name;


	public JwtResponse(String jwttoken, String name){

		this.jwttoken = jwttoken;

		this.name = name;


	}

}
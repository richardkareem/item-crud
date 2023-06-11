package org.stockitem.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.stockitem.config.CustomErrorType;
import org.stockitem.config.JwtTokenUtil;
import org.stockitem.model.DAOUser;
import org.stockitem.model.UserDTO;
import org.stockitem.model_jwt.JwtRequest;
import org.stockitem.model_jwt.JwtResponse;
import org.stockitem.repo.UserDao;
import org.stockitem.service.JwtUserDetailsService;

import java.util.regex.Pattern;

@RestController
@CrossOrigin("*")
public class JwtAuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService userDetailsService;
	@Autowired
	private UserDao userDao;


	//Login
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(
													   @RequestBody JwtRequest authenticationRequest) throws Exception {
		// cari username
		DAOUser user = userDao.findByUsername(authenticationRequest.getUsername());

		if(user.getUsername().equals( authenticationRequest.getUsername())) {

			authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
			final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

			final String token = jwtTokenUtil.generateToken(userDetails);

			//print token dan role
			return ResponseEntity.ok(new JwtResponse(token, user.getRole(), user.getId(), user.getName(), user.getAlamat()));
		} else{
			return new ResponseEntity<>("Gagal", HttpStatus.BAD_REQUEST);
		}



	}

	//Regist
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<?> saveUser(@RequestBody UserDTO user) throws Exception {
		//regexPassword
		boolean pw = Boolean.parseBoolean(String.valueOf(Pattern.matches(
				"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$", user.getPassword())));

		if (!pw){
			return new ResponseEntity<>(new CustomErrorType(
					"Password Harus Berupa huruf besar karakter dan angka! "),HttpStatus.FORBIDDEN);//errpr
		}else {

			return ResponseEntity.ok(userDetailsService.save(user));
		}
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}
}

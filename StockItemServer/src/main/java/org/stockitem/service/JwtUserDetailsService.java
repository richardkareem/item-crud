package org.stockitem.service;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.stockitem.model.DAOUser;
import org.stockitem.model.UserDTO;
import org.stockitem.repo.UserDao;

import java.util.ArrayList;


@Service
public class JwtUserDetailsService implements UserDetailsService {

	public static final Logger logger = LoggerFactory.getLogger(JwtUserDetailsService.class);

	@Autowired
	private UserDao userDao;//repo

	@Autowired
	private PasswordEncoder bcryptEncoder;


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		logger.info("Creating Trans with  {}", username); //kl masukin token nanti hasilnya gini  Creating trans with username(cnth: rochard)
		DAOUser user = userDao.findByUsername(username);

		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return new User(user.getUsername(), user.getPassword(),  new ArrayList<>());
	}



	//method save
	public DAOUser save(UserDTO user) {
		DAOUser newUser = new DAOUser();
		newUser.setUsername(user.getUsername());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		newUser.setName(user.getName());;
		return userDao.save(newUser);
	}


}
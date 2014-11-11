package com.onetesthub.cloud.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.onetesthub.cloud.entity.User;

@Component
public class UserServiceImpl extends BaseServiceImpl implements UserService{
	
	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {
		
		User user = this.findByUsername(username);
		if (null == user) {
			throw new UsernameNotFoundException("The user with name " + username + " was not found");
		}

		return user;
	}

	@Override
	public User findByUsername(String username) {
		
		return userDao.findByUsername(username);
		
	}

	@Override
	public User save(User entity) {
		
		return userDao.save(entity);
	}

	@Override
	public List<User> findAll() {
		
		return userDao.findAll();
	}

	@Override
	public User find(Long id) {
		
		return userDao.find(id);
	}

	@Override
	public void delete(Long id) {
		
		 userDao.delete(id);
		
	}

}

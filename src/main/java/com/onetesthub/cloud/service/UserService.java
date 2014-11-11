package com.onetesthub.cloud.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.onetesthub.cloud.entity.NewsEntry;
import com.onetesthub.cloud.entity.User;

public interface UserService extends BasicService<User, Long>, UserDetailsService{
	
	User findByUsername(String username);

}

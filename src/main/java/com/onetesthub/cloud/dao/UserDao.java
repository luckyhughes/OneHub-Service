package com.onetesthub.cloud.dao;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.onetesthub.cloud.entity.User;


public interface UserDao extends Dao<User, Long>, UserDetailsService
{

	User findByUsername(String username);

}
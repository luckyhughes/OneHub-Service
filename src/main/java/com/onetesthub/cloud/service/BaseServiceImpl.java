package com.onetesthub.cloud.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.onetesthub.cloud.dao.NewsEntryDao;
import com.onetesthub.cloud.dao.UserDao;

public class BaseServiceImpl{
	
	@Autowired
	protected UserDao userDao;
	
	@Autowired
	protected NewsEntryDao newsEntryDao;
	
}

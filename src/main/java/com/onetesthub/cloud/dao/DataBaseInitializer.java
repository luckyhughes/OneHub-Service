package com.onetesthub.cloud.dao;

import java.util.Date;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.onetesthub.cloud.entity.NewsEntry;
import com.onetesthub.cloud.entity.User;
import com.onetesthub.cloud.service.NewsEntryService;
import com.onetesthub.cloud.service.UserService;

public class DataBaseInitializer
{

	private NewsEntryService newsEntryService;

	private UserService userService;

	private PasswordEncoder passwordEncoder;


	protected DataBaseInitializer()
	{
		/* Default constructor for reflection instantiation */
	}


	public DataBaseInitializer(UserService userService, NewsEntryService newsEntryService, PasswordEncoder passwordEncoder)
	{
		this.userService = userService;
		this.newsEntryService = newsEntryService;
		this.passwordEncoder = passwordEncoder;
	}


	public void initDataBase()
	{
		User userUser = new User("onetesthub", "user", this.passwordEncoder.encode("user"));
		userUser.addRole("user");
		this.userService.save(userUser);

		User adminUser = new User("onetesthub", "admin", this.passwordEncoder.encode("admin"));
		adminUser.addRole("user");
		adminUser.addRole("admin");
		this.userService.save(adminUser);

		long timestamp = System.currentTimeMillis() - 1000 * 60 * 60 * 24;
		for (int i = 0; i < 10; i++) {
			NewsEntry newsEntry = new NewsEntry("onetesthub");
			newsEntry.setContent("This is example content " + i);
			newsEntry.setDate(new Date(timestamp));
			this.newsEntryService.save(newsEntry);
			timestamp += 1000 * 60 * 60;
		}
	}

}
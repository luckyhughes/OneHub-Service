package com.onetesthub.cloud.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sun.jersey.api.spring.Autowire;

@Service
public class PasswordHash {
	
	@Autowired
	private static PasswordEncoder passwordEncoder;//= new BCryptPasswordEncoder(11);

	
	public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
		
		System.out.println("********In setPasswordEncoder************* ");
		PasswordHash.passwordEncoder = passwordEncoder;
	}
	
	public static String HashPassword(String password) {
		
		return passwordEncoder.encode(password);

	}	
	
	void test(){
		
		System.out.println("Yahooooooooo!!!!!!!!!!!!!");
	}
		
}

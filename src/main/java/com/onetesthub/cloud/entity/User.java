package com.onetesthub.cloud.entity;

import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.onetesthub.cloud.auth.PasswordHash;


@SuppressWarnings("serial")
@javax.persistence.Entity
@Table(name="users")
public class User extends Entity implements UserDetails
{
	
	@Id
	@GeneratedValue
	private Long id;
	
	@Column(name = "FIRSTNAME", nullable = true)
	String firstName;

	@Column(name = "LASTNAME", nullable = true)
	String lastName;

	@Column(name = "USERNAME", unique = true, nullable = false)
	String username;

	@Column(name = "PASSWORD", nullable = false)
	String password;

	@Column(name = "PHONE", unique = true, nullable = true)
	String phone;

	@Column(name = "EMAIL", unique = true, nullable = true)
	String email;

	@Column(name = "COUNTRY", nullable = true)
	String country;

	@Column(name = "ISENABLED", nullable = true)
	private boolean isEnabled = true;


	@ElementCollection(fetch = FetchType.EAGER)
	private Set<String> roles = new HashSet<String>();

	public User()
	{
		//assign default role as "user"
		roles.add("user");
	}


	public User(String tenantId, String username, String passwordHash)
	{
		super(tenantId);
		this.username = username;
		this.password = passwordHash;
	}


	public Long getId()
	{
		return this.id;
	}


	public void setId(Long id)
	{
		this.id = id;
	}
	

	public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPhone() {
		return phone;
	}


	public void setPhone(String phone) {
		this.phone = phone;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getCountry() {
		return country;
	}


	public void setCountry(String country) {
		this.country = country;
	}


	public void setIsEnabled(boolean isEnabled) {
		this.isEnabled = isEnabled;
	}
	
	public boolean getIsEnabled() {
		return isEnabled;
	}
	

	@Override
	public boolean isEnabled()
	{
		return getIsEnabled();
	}
	
	@Override
	public String getPassword()
	{
		return this.password;
	}


	public void setPassword(String password)
	{
		
		this.password = PasswordHash.HashPassword(password);
	}


	@Override
	public String getUsername()
	{
		return this.username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}


	public Set<String> getRoles()
	{
		return this.roles;
	}


	public void setRoles(Set<String> roles)
	{
		this.roles = roles;
	}


	public void addRole(String role)
	{
		this.roles.add(role);
	}
	
	@Override
	public Collection<GrantedAuthority> getAuthorities()
	{
		Set<String> roles = this.getRoles();

		if (roles == null) {
			return Collections.emptyList();
		}

		Set<GrantedAuthority> authorities = new HashSet<GrantedAuthority>();
		for (String role : roles) {
			authorities.add(new SimpleGrantedAuthority(role));
		}

		return authorities;
	}


	@Override
	public boolean isAccountNonExpired()
	{
		return true;
	}


	@Override
	public boolean isAccountNonLocked()
	{
		return true;
	}


	@Override
	public boolean isCredentialsNonExpired()
	{
		return true;
	}

}
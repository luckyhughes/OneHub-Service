package com.onetesthub.cloud.common;

import java.util.Map;

public class UserTransfer {

	private final String userName;

	private final String tenantId;

	private final Map<String, Boolean> roles;

	public UserTransfer(String tenantId, String userName,
			Map<String, Boolean> roles) {
		this.tenantId = tenantId;
		this.userName = userName;
		this.roles = roles;
	}

	public String getUserName() {
		return this.userName;
	}

	public Map<String, Boolean> getRoles() {
		return this.roles;
	}

	public String getTenantId() {
		return tenantId;
	}

}
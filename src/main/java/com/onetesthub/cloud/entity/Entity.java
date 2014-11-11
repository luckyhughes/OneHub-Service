package com.onetesthub.cloud.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@SuppressWarnings("serial")
@MappedSuperclass
public abstract class Entity implements Serializable
{
	
	@Column(name = "tenant_id", nullable = false)
	protected String tenantId;
	
	protected Entity(){
			
	}
	
	protected Entity(String tenantId){
		
		this.tenantId = tenantId;
		
	}

	public String getTenantId() {
		return tenantId;
	}

	public void setTenantId(String tennantId) {
		this.tenantId = tennantId;
	}

}
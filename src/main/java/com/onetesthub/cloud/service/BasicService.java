package com.onetesthub.cloud.service;

import java.util.List;

import com.onetesthub.cloud.entity.Entity;

public interface BasicService<T extends Entity, I> {
	
	T save(T entity);
	List<T> findAll();
	T find(I id);
	void delete(I id);
}

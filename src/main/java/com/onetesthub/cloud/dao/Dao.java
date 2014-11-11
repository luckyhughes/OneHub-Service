package com.onetesthub.cloud.dao;

import java.util.List;

import com.onetesthub.cloud.entity.Entity;


public interface Dao<T extends Entity, I>
{

	List<T> findAll();


	T find(I id);


	T save(T object);


	void delete(I id);

}
package com.onetesthub.cloud.service;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.onetesthub.cloud.entity.NewsEntry;

@Component
public class NewsEntryServiceImpl extends BaseServiceImpl implements NewsEntryService {

	@Override
	@Transactional
	public NewsEntry save(NewsEntry entity) {
		
		return newsEntryDao.save(entity);
	}

	@Override
	@Transactional
	public List<NewsEntry> findAll() {
		
		return newsEntryDao.findAll();
	}

	@Override
	@Transactional
	public NewsEntry find(Long id) {
		
		return newsEntryDao.find(id);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		
		newsEntryDao.delete(id);
		
	}
	
	

}

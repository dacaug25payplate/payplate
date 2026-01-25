package com.payplate.menuservice.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payplate.menuservice.entities.Category;
import com.payplate.menuservice.entities.Menu;
import com.payplate.menuservice.entities.SubCategory;
import com.payplate.menuservice.repositories.CategoryRepository;
import com.payplate.menuservice.repositories.MenuRepository;
import com.payplate.menuservice.repositories.SubCategoryRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class MenuService {

	@Autowired
	SubCategoryRepository subCategoryRepository;

	@Autowired
	CategoryRepository categoryRepository;

	@Autowired
	MenuRepository menuRepository;


	public List<Category> getAllCategroy()
	{
		return categoryRepository.findAll();
	}

	public List<SubCategory> getAllSubCategory()
	{
		return subCategoryRepository.findAll();
	}

	public Category getByCatId(int id) {
		return categoryRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Category not found"));
	}
	

    public SubCategory getBySubCatId(int id) {
        return subCategoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("SubCategory not found"));
    }

    public void save(Menu menu) {
        menuRepository.save(menu); 
    }

    

}

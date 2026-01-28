package com.payplate.menuservice.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.payplate.menuservice.entities.Category;
import com.payplate.menuservice.entities.Menu;
import com.payplate.menuservice.entities.SubCategory;
import com.payplate.menuservice.repositories.CategoryRepository;
import com.payplate.menuservice.repositories.MenuRepository;
import com.payplate.menuservice.repositories.SubCategoryRepository;

import jakarta.transaction.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

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

    
    public List<Menu> getAllMenu() {
    	return menuRepository.findAll();
    }

    public void deleteMenu(int id) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu not found"));

        // Example: /images/menu/1769495497571_Paneer.png
        String imageUrl = menu.getImageUrl();

        if (imageUrl != null && !imageUrl.isEmpty()) {
            // Build real path on disk
            String basePath = "src/main/resources/static";
            Path imagePath = Paths.get(basePath + imageUrl);

            try {
                Files.deleteIfExists(imagePath);
            } catch (IOException e) {
                throw new RuntimeException("Failed to delete image file: " + imagePath);
            }
        }

        // Finally delete DB record
        menuRepository.deleteById(id);
    }
    
    public void updateMenu(int id, String name, String desc, double price,
            int catId, int subId, MultipartFile image) throws IOException {

			Menu menu = menuRepository.findById(id)
			 .orElseThrow(() -> new RuntimeException("Menu not found"));
			
			menu.setMenuname(name);
			menu.setDescription(desc);
			menu.setPrice(price);
			menu.setCategory(getByCatId(catId));
			menu.setSubCategory(getBySubCatId(subId));
			
			// If new image uploaded → delete old + save new
			if (image != null && !image.isEmpty()) {
			
			// delete old image
			if (menu.getImageUrl() != null) {
			 Path oldPath = Paths.get("src/main/resources/static" + menu.getImageUrl());
			 Files.deleteIfExists(oldPath);
			}
			
			// save new image
			String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
			String uploadDir = "src/main/resources/static/images/menu/";
			Path newPath = Paths.get(uploadDir, fileName);
			Files.createDirectories(newPath.getParent());
			Files.write(newPath, image.getBytes());
			
			menu.setImageUrl("/images/menu/" + fileName);
			}
			
			menuRepository.save(menu);
			}

	}

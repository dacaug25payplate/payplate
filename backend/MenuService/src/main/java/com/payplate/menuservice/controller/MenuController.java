package com.payplate.menuservice.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.payplate.menuservice.entities.Category;
import com.payplate.menuservice.entities.Menu;
import com.payplate.menuservice.entities.SubCategory;
import com.payplate.menuservice.repositories.MenuRepository;
import com.payplate.menuservice.services.MenuService;



@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class MenuController {
	@Autowired
	MenuService menuService;
	
	@Autowired
	MenuRepository mrepo;

	//method to getall category
	@GetMapping("/getAllCategory")
	public List<Category> getAllCategory()
	{
		return menuService.getAllCategroy();
	}
	
	

	//method to get all subcategory
	@GetMapping("/getAllSubCategory")
	public List<SubCategory> getAllSubCategory()
	{
		return menuService.getAllSubCategory();
	}

	// 
	@PostMapping("/menu")
	public ResponseEntity<String> saveMenu(
			@RequestParam String menuname,
			@RequestParam String description,
			@RequestParam double price,
			@RequestParam int categoryid,
			@RequestParam int subcategoryid,
			@RequestParam MultipartFile image
			) {
		try {
			Category category = menuService.getByCatId(categoryid);
			SubCategory subCategory = menuService.getBySubCatId(subcategoryid);

			// Save image to folder
			String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
			String uploadDir = "src/main/resources/static/images/menu/";
			Path path = Paths.get(uploadDir, fileName);

			Files.createDirectories(path.getParent());
			Files.write(path, image.getBytes());

			Menu menu = new Menu();
			menu.setMenuname(menuname);
			menu.setDescription(description);
			menu.setPrice(price);
			menu.setCategory(category);
			menu.setSubCategory(subCategory);
			menu.setImageUrl("/images/menu/" + fileName);

			menuService.save(menu);

			return ResponseEntity.ok("Menu saved successfully");

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body("Failed to save menu");
		}
	}

}

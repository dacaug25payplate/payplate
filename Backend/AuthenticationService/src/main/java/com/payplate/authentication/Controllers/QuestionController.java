package com.payplate.authentication.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.payplate.authentication.Entities.Question;
import com.payplate.authentication.Services.QuestionService;

@RestController
@RequestMapping("/Question")
@CrossOrigin(origins = "http://localhost:3000")
<<<<<<< HEAD
=======

>>>>>>> d9e786654b0dcaf9538b676f6c5d3c02c1dabece
public class QuestionController {
	
	@Autowired
	QuestionService questionservice;

	@GetMapping("/getAllQuestion")
	public List<Question> getAllQuestion()
	{
		return questionservice.getAllQuestion();
		
	}
	
	@GetMapping("/{id}")
	public Question getQuestion(@PathVariable("id") int id)
	{
		return questionservice.getQuestion(id);
		
	}
}

package com.payplate.authentication.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payplate.authentication.Entities.Question;
import com.payplate.authentication.Repositeries.QuestionRepository;

@Service
public class QuestionService {

	@Autowired
	QuestionRepository questionRepository;

	//service for  get all question 
	public List<Question> getAllQuestion()
	{
		return questionRepository.findAll();
	}

	//service for get question for id 
	public Question getQuestion(int id) {
		// TODO Auto-generated method stub
		Question q = null;
		Optional <Question> op = questionRepository.findById(id);
		if(op != null)
		{
			try {
				q = op.get();
			}catch(Exception e)
			{
				e.printStackTrace();
			}
		}
		return q;
	}
	

}

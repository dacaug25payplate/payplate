package com.payplate.authentication.Entities;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "question")
public class Question {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	@Column(name="questionid")
	private int questionid;
	
	@Column(name="question")
	private String question;

	public int getQuestionId() {
		return questionid;
	}

	public void setQuestionId(int questionId) {
		this.questionid = questionId;
	}

	public String getQuestions() {
		return question;
	}

	public void setQuestions(String question) {
		this.question = question;
	}

	public Question(int questionid, String question) {
		super();
		this.questionid = questionid;
		this.question = question;
	}

	public Question() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	
	
}

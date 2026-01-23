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
	private Integer questionId;
	
	@Column(name="question")
	private String questions;

	public Integer getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Integer questionId) {
		this.questionId = questionId;
	}

	public String getQuestions() {
		return questions;
	}

	public void setQuestions(String questions) {
		this.questions = questions;
	}

	
	public Question() {
		super();
	}

	public Question(Integer questionId, String questions) {
		super();
		this.questionId = questionId;
		this.questions = questions;
	}
	
	
}

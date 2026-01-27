package com.payplate.authentication.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Question {
    @Id
    private Integer questionid;
    private String question;
	public Integer getQuestionid() {
		return questionid;
	}
	public void setQuestionid(Integer questionid) {
		this.questionid = questionid;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
    
    
}


package com.payplate.authentication.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payplate.authentication.Entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Integer> {}

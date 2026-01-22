package com.payplate.authentication.Repositeries;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.payplate.authentication.Entities.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {

}

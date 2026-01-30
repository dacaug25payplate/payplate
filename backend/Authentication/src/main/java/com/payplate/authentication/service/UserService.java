package com.payplate.authentication.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payplate.authentication.Entity.User;
import com.payplate.authentication.repository.UserRepository;


@Service
public class UserService {

    @Autowired
    private UserRepository repo;
    
    public User register(User user) {
        return repo.save(user);
    }

    public User login(String username, String password) {
        User user = repo.findByUsername(username).orElse(null);

        if (user == null) {
            throw new RuntimeException("USER_NOT_FOUND");
        }

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("WRONG_PASSWORD");
        }

        return user;
    }

    public String getQuestion(String username) {
        User user = repo.findByUsername(username).orElse(null);
        if (user == null) return null;
        return user.getQuestion().getQuestion();
    }

    public boolean verifyAnswer(String username, String answer) {
        User user = repo.findByUsername(username).orElse(null);
        return user != null && user.getAnswer().equalsIgnoreCase(answer);
    }

    public boolean updatePassword(String username, String password) {
        User user = repo.findByUsername(username).orElse(null);
        if (user == null) return false;
        user.setPassword(password);
        repo.save(user);
        return true;
    }

	public List<User> getStaff() {
		return repo.findByRole_RoleidIn(List.of(3, 4));
	}
	
	public void deleteStaff(int id) {
		repo.deleteById(id);
	}
	
	public boolean isUsernameExists(String username) {
	    return repo.existsByUsername(username);
	}


}


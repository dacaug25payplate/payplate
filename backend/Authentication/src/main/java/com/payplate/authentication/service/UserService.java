package com.payplate.authentication.service;


import java.util.Optional;

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
<<<<<<< HEAD

=======
    
    public Optional<User> isUserNameExists(String username)
    {
    	return repo.findByUsername(username);
    }
>>>>>>> 0d8dcb55bd90cd8e673e695e3287dac8eb66b53a
}


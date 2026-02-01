package com.payplate.authentication.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.payplate.authentication.Entity.Question;
import com.payplate.authentication.Entity.Role;
import com.payplate.authentication.Entity.User;
import com.payplate.authentication.repository.QuestionRepository;
import com.payplate.authentication.repository.RoleRepository;
import com.payplate.authentication.service.UserService;


@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private QuestionRepository questionRepo;
    
    @Autowired
    private RoleRepository roleRepo;

    // REGISTER
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return service.register(user);
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            User logged = service.login(user.getUsername(), user.getPassword());
            return ResponseEntity.ok(logged);
        } catch (RuntimeException e) {

            if (e.getMessage().equals("USER_NOT_FOUND")) {
                return ResponseEntity.status(404).body("User not found");
            }

            if (e.getMessage().equals("WRONG_PASSWORD")) {
                return ResponseEntity.status(401).body("Wrong password");
            }

            return ResponseEntity.status(500).body("Something went wrong");
        }
    }


    // GET QUESTION
    @GetMapping("/forgot/{username}")
    public ResponseEntity<?> forgot(@PathVariable String username) {
        String q = service.getQuestion(username);
        if (q == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(q);
    }

    // VERIFY ANSWER
    @PostMapping("/verify")
    public boolean verify(@RequestBody User user) {
        return service.verifyAnswer(user.getUsername(), user.getAnswer());
    }

    // UPDATE PASSWORD
    @PostMapping("/update")
    public boolean update(@RequestBody User user) {
        return service.updatePassword(user.getUsername(), user.getPassword());
    }

    // LOAD QUESTIONS FOR REGISTER
    @GetMapping("/questions")
    public List<Question> getQuestions() {
        return questionRepo.findAll();
    }
    
    //LOAD ROLES FOR  STAFF REGISTER
    @GetMapping("/staff")
    public List<Role> getStaffRole(){
    	return roleRepo.findByRoleidIn(List.of(3,4));
    }
    
    // LOAD STAFF FOR ADMIN
    @GetMapping("/getstaff")
    public List<User> getStaff(){
    	return service.getStaff();
    }
    
    //Delete STAFF BY ADMIN
    @DeleteMapping("/deleteStaff/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id){
    	service.deleteStaff(id);
    	return ResponseEntity.ok("Deleted successfully");
    }
    
    //
    @GetMapping("/check-username")
    public ResponseEntity<Boolean> checkUsername(@RequestParam String username) {
        boolean exists = service.isUsernameExists(username);
        return ResponseEntity.ok(exists);
    }
    
    @GetMapping("/getusername/{id}")
    public ResponseEntity<String> getUsername(@PathVariable int id) {

        String username = service.getUsernameById(id);

        return ResponseEntity.ok(username);
    }


}



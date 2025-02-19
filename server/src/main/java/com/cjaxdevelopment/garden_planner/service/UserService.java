package com.cjaxdevelopment.garden_planner.service;

import com.cjaxdevelopment.garden_planner.model.User;
import com.cjaxdevelopment.garden_planner.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(String name, String email, String password) throws Exception {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new Exception("User already exists");
        }
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        return userRepository.save(user);
    }

    public User authenticateUser(String email, String password) throws Exception {
        User user = userRepository.findByEmail(email)
                       .orElseThrow(() -> new Exception("User not found"));
        System.out.println("Found user: " + user);
        String storedHash = user.getPassword();
        // Normalize hash if it starts with "$2y$"
        System.out.println("Raw password: " + password);

        System.out.println("Stored hash: " + storedHash);
        if (storedHash.startsWith("$2y$")) {
            storedHash = "$2a$" + storedHash.substring(4);
        }
        if (passwordEncoder.matches(password, storedHash)) {
            return user;
        }
        throw new Exception("Invalid credentials");
    }
    
}


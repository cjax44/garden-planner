package com.cjaxdevelopment.garden_planner.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cjaxdevelopment.garden_planner.model.User;
import com.cjaxdevelopment.garden_planner.service.UserService;
import com.cjaxdevelopment.garden_planner.util.JWTUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;
    
    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> userMap) {
        try {
            User user = userService.registerUser(
                userMap.get("name"), userMap.get("email"), userMap.get("password"));
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> userMap) {
        try {
            User user = userService.authenticateUser(
                userMap.get("email"), userMap.get("password"));
            String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getName());
            System.out.println(token);
            return ResponseEntity.ok(Collections.singletonMap("token", token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}


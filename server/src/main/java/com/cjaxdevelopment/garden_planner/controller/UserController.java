package com.cjaxdevelopment.garden_planner.controller;

// import com.cjaxdevelopment.garden_planner.model.User;
import com.cjaxdevelopment.garden_planner.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getUserDetails(Authentication authentication) {
        // In our JWTFilter, we set the principal to the user's email.
        String email = (String) authentication.getPrincipal();
        return userRepository.findByEmail(email)
                .map(user -> {
                    // Optionally remove sensitive fields (like password) before returning.
                    user.setPassword(null);
                    return ResponseEntity.ok(user);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}

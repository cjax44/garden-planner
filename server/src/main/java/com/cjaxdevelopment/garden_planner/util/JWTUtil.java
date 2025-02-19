package com.cjaxdevelopment.garden_planner.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JWTUtil {

    // Inject the secret from application.properties (or use a default)
    @Value("${jwt.secret}")
    private String secret;

    // Generate a token for a given user
    public String generateToken(Long userId, String email, String name) {
        // Set token expiration to 1 hour (adjust as needed)
        long expirationTime = 3600000; // 1 hour in milliseconds

        return Jwts.builder()
                .setSubject(email)  // Typically we use email as the subject
                .claim("id", userId)   // You can include additional claims
                .claim("name", name)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(SignatureAlgorithm.HS256, secret)  // Sign with our secret key using HS256 algorithm
                .compact();
    }
    
    // Optionally, you can add a method to validate or parse the token.
}

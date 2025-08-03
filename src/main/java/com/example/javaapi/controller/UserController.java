
package com.example.javaapi.controller;

import com.example.javaapi.model.UserEntity;
import com.example.javaapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        String role = body.get("role"); 

        if (userRepository.existsByUsername(username)) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        UserEntity newUser = UserEntity.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .role(role)
                .build();

        userRepository.save(newUser);
        return ResponseEntity.ok("User created successfully");
    }

    
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/change-password/{userId}")
    public ResponseEntity<?> changePasswordAsAdmin(@PathVariable Long userId, @RequestBody Map<String, String> body) {
        return userRepository.findById(userId)
                .map(user -> {
                    user.setPassword(passwordEncoder.encode(body.get("newPassword")));
                    userRepository.save(user);
                    return ResponseEntity.ok("Password updated for user ID: " + userId);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PutMapping("/change-my-password/{userId}")
    public ResponseEntity<?> changeOwnPassword(@PathVariable Long userId, @RequestBody Map<String, String> body, Principal principal) {
        return userRepository.findByUsername(principal.getName())
                .map(loggedInUser -> {
                    if (!loggedInUser.getId().equals(userId)) {
                        return ResponseEntity.status(403).body("You cannot change another user's password.");
                    }
                    loggedInUser.setPassword(passwordEncoder.encode(body.get("newPassword")));
                    userRepository.save(loggedInUser);
                    return ResponseEntity.ok("Your password has been updated.");
                })
                .orElse(ResponseEntity.status(401).body("User not found."));
    }

    
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/promote/{userId}")
    public ResponseEntity<?> promoteToAdmin(@PathVariable Long userId) {
        return userRepository.findById(userId)
                .map(user -> {
                    user.setRole("ROLE_ADMIN");
                    userRepository.save(user);
                    return ResponseEntity.ok("User promoted to ADMIN.");
                })
                .orElse(ResponseEntity.notFound().build());
    }

    //  5. Admin demoting admin to user
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/demote/{userId}")
    public ResponseEntity<?> demoteToUser(@PathVariable Long userId) {
        return userRepository.findById(userId)
                .map(user -> {
                    user.setRole("ROLE_USER");
                    userRepository.save(user);
                    return ResponseEntity.ok("Admin demoted to USER.");
                })
                .orElse(ResponseEntity.status(404).body("User not found"));
    }

    //  6. Admin deleting a user
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        return userRepository.findById(userId)
                .map(user -> {
                    userRepository.delete(user);
                    return ResponseEntity.ok("User deleted successfully");
                })
                .orElse(ResponseEntity.status(404).body("User not found"));
    }

    //  7. View own user details (user or admin)
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/me/{userId}")
    public ResponseEntity<?> getMyDetails(@PathVariable Long userId, Principal principal) {
        return userRepository.findByUsername(principal.getName())
                .map(loggedInUser -> {
                    if (!loggedInUser.getId().equals(userId)) {
                        return ResponseEntity.status(403).body("You cannot view another user's details.");
                    }
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", loggedInUser.getId());
                    map.put("username", loggedInUser.getUsername());
                    map.put("role", loggedInUser.getRole());
                    return ResponseEntity.ok(map);
                })
                .orElse(ResponseEntity.status(401).body("User not found."));
    }

    //  8. Get all users (admin only)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        List<UserEntity> allUsers = userRepository.findAll();
        return ResponseEntity.ok(allUsers);
    }
}
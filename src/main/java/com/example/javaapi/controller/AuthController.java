
// package com.example.javaapi.controller;

// import com.example.javaapi.model.UserEntity;
// import com.example.javaapi.repository.UserRepository;
// import com.example.javaapi.utils.JwtUtil;
// import jakarta.annotation.PostConstruct;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.*;
// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.security.authentication.*;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.web.bind.annotation.*;

// import java.util.*;

// @RestController
// @RequestMapping("/auth")
// public class AuthController {

//     @Autowired
//     private AuthenticationManager authManager;

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private JwtUtil jwtUtil;

//     @Autowired
//     private PasswordEncoder passwordEncoder;

    
//     @PostMapping("/login")
//     public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
//         String username = request.get("username");
//         String password = request.get("password");

//         authManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
//         UserEntity user = userRepository.findByUsername(username).orElseThrow();

//         String role = user.getRole().startsWith("ROLE_") ? user.getRole() : "ROLE_" + user.getRole();
//         String token = jwtUtil.generateToken(username, role);

//         return ResponseEntity.ok(Collections.singletonMap("token", token));
//     }

    
//     @PostConstruct
//     public void seedUsers() {
//         if (userRepository.count() == 0) {
//             userRepository.save(UserEntity.builder()
//                     .username("admin")
//                     .password(passwordEncoder.encode("admin"))
//                     .role("ROLE_ADMIN")
//                     .build());

//             userRepository.save(UserEntity.builder()
//                     .username("user1")
//                     .password(passwordEncoder.encode("user1"))
//                     .role("ROLE_USER")
//                     .build());
//         }
//     }

    
//     @PostMapping("/register")
//     @PreAuthorize("hasRole('ADMIN')")
//     public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
//         String username = request.get("username");
//         String password = request.get("password");
//         String role = request.get("role");

//         if (userRepository.existsByUsername(username)) {
//             return ResponseEntity.status(HttpStatus.CONFLICT).body(" Username already exists");
//         }

//         UserEntity user = UserEntity.builder()
//                 .username(username)
//                 .password(passwordEncoder.encode(password))
//                 .role(role.startsWith("ROLE_") ? role : "ROLE_" + role)
//                 .build();

//         userRepository.save(user);
//         return ResponseEntity.ok(" User registered successfully");
//     }

    
//     @DeleteMapping("/delete/{username}")
//     @PreAuthorize("hasRole('ADMIN')")
//     public ResponseEntity<?> deleteUser(@PathVariable String username) {
//         Optional<UserEntity> userOpt = userRepository.findByUsername(username);
//         if (userOpt.isEmpty()) {
//             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(" User not found");
//         }
//         userRepository.delete(userOpt.get());
//         return ResponseEntity.ok("🗑️ User deleted successfully");
//     }

    
//     @PutMapping("/change-password/{username}")
//     @PreAuthorize("#username == authentication.name or hasRole('ADMIN')")
//     public ResponseEntity<?> changePassword(
//             @PathVariable String username,
//             @RequestBody Map<String, String> request,
//             Authentication authentication) {

//         Optional<UserEntity> userOpt = userRepository.findByUsername(username);
//         if (userOpt.isEmpty()) {
//             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(" User not found");
//         }

//         String newPassword = request.get("newPassword");
//         if (newPassword == null || newPassword.isBlank()) {
//             return ResponseEntity.badRequest().body(" New password is required");
//         }

//         UserEntity user = userOpt.get();
//         user.setPassword(passwordEncoder.encode(newPassword));
//         userRepository.save(user);

//         return ResponseEntity.ok(" Password updated successfully");
//     }
// }




package com.example.javaapi.controller;

import com.example.javaapi.model.UserEntity;
import com.example.javaapi.repository.UserRepository;
import com.example.javaapi.utils.JwtUtil;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            String password = request.get("password");

            authManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            UserEntity user = userRepository.findByUsername(username).orElseThrow();

            String role = user.getRole().startsWith("ROLE_") ? user.getRole() : "ROLE_" + user.getRole();
            String token = jwtUtil.generateToken(username, role);

            return ResponseEntity.ok(Collections.singletonMap("token", token));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("message", "Invalid username or password"));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("message", "Login error: " + ex.getMessage()));
        }
    }

    @PostConstruct
    public void seedUsers() {
        if (userRepository.count() == 0) {
            userRepository.save(UserEntity.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin"))
                    .role("ROLE_ADMIN")
                    .build());

            userRepository.save(UserEntity.builder()
                    .username("user1")
                    .password(passwordEncoder.encode("user1"))
                    .role("ROLE_USER")
                    .build());
        }
    }

    @PostMapping("/register")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            String password = request.get("password");
            String role = request.get("role");

            if (userRepository.existsByUsername(username)) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Collections.singletonMap("message", "Username already exists"));
            }

            UserEntity user = UserEntity.builder()
                    .username(username)
                    .password(passwordEncoder.encode(password))
                    .role(role.startsWith("ROLE_") ? role : "ROLE_" + role)
                    .build();

            userRepository.save(user);
            return ResponseEntity.ok(Collections.singletonMap("message", "User registered successfully"));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("message", "Register error: " + ex.getMessage()));
        }
    }

    @DeleteMapping("/delete/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable String username) {
        Optional<UserEntity> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("message", "User not found"));
        }
        userRepository.delete(userOpt.get());
        return ResponseEntity.ok(Collections.singletonMap("message", "🗑️ User deleted successfully"));
    }

    @PutMapping("/change-password/{username}")
    @PreAuthorize("#username == authentication.name or hasRole('ADMIN')")
    public ResponseEntity<?> changePassword(
            @PathVariable String username,
            @RequestBody Map<String, String> request,
            Authentication authentication) {

        Optional<UserEntity> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("message", "User not found"));
        }

        String newPassword = request.get("newPassword");
        if (newPassword == null || newPassword.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("message", "New password is required"));
        }

        UserEntity user = userOpt.get();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return ResponseEntity.ok(Collections.singletonMap("message", "Password updated successfully"));
    }
}

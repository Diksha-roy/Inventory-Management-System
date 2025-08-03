// // package com.example.javaapi.utils;

// // import io.jsonwebtoken.*;
// // import io.jsonwebtoken.security.Keys;
// // import jakarta.annotation.PostConstruct;
// // import org.springframework.beans.factory.annotation.Value;
// // import org.springframework.stereotype.Component;

// // import javax.crypto.SecretKey;
// // import java.nio.charset.StandardCharsets;
// // import java.util.Date;

// // @Component
// // public class JwtUtil {

// //     @Value("${jwt.secret}")
// //     private String secret;

// //     @Value("${jwt.expiration}")
// //     private long expirationMs;

// //     private SecretKey secretKey;

// //     @PostConstruct
// //     public void init() {
// //         byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
// //         if (keyBytes.length < 64) {
// //             throw new IllegalArgumentException("JWT secret key must be at least 512 bits (64 characters) for HS512.");
// //         }
// //         this.secretKey = Keys.hmacShaKeyFor(keyBytes);
// //     }

// //     public String generateToken(String username, String role) {
// //         return Jwts.builder()
// //                 .setSubject(username)
// //                 .claim("role", role)
// //                 .setIssuedAt(new Date())
// //                 .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
// //                 .signWith(secretKey, SignatureAlgorithm.HS512)
// //                 .compact();
// //     }

// //     public String extractUsername(String token) {
// //         return parseClaims(token).getSubject();
// //     }

// //     public String extractRole(String token) {
// //         return parseClaims(token).get("role", String.class);
// //     }

// //     public boolean validateToken(String token) {
// //         try {
// //             parseClaims(token);
// //             return true;
// //         } catch (JwtException e) {
// //             System.out.println("Invalid JWT: " + e.getMessage());
// //             return false;
// //         }
// //     }

// //     private Claims parseClaims(String token) {
// //         if (token.startsWith("Bearer ")) {
// //             token = token.substring(7); // remove Bearer prefix
// //         }

// //         return Jwts.parserBuilder()
// //                 .setSigningKey(secretKey)
// //                 .build()
// //                 .parseClaimsJws(token)
// //                 .getBody();
// //     }
// // }



// // package com.example.javaapi.utils;

// // import io.jsonwebtoken.*;
// // import io.jsonwebtoken.security.Keys;
// // import jakarta.annotation.PostConstruct;
// // import org.springframework.beans.factory.annotation.Value;
// // import org.springframework.stereotype.Component;

// // import javax.crypto.SecretKey;
// // import java.nio.charset.StandardCharsets;
// // import java.util.Date;

// // @Component
// // public class JwtUtil {

// //     @Value("${jwt.secret}")
// //     private String secret;

// //     @Value("${jwt.expiration}")
// //     private long expirationMs;

// //     private SecretKey secretKey;

// //     @PostConstruct
// //     public void init() {
// //         byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
// //         if (keyBytes.length < 64) {
// //             throw new IllegalArgumentException("JWT secret key must be at least 512 bits (64 characters) for HS512.");
// //         }
// //         this.secretKey = Keys.hmacShaKeyFor(keyBytes);
// //     }

// //     public String generateToken(String username, String role) {
// //         return Jwts.builder()
// //                 .setSubject(username)
// //                 .claim("role", role) // ✅ role store in token
// //                 .setIssuedAt(new Date())
// //                 .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
// //                 .signWith(secretKey, SignatureAlgorithm.HS512)
// //                 .compact();
// //     }

// //     public String extractUsername(String token) {
// //         return parseClaims(token).getSubject();
// //     }

// //     public String extractRole(String token) {
// //         return parseClaims(token).get("role", String.class);
// //     }

// //     public boolean validateToken(String token) {
// //         try {
// //             parseClaims(token);
// //             return true;
// //         } catch (JwtException e) {
// //             System.out.println("Invalid JWT: " + e.getMessage());
// //             return false;
// //         }
// //     }

// //     private Claims parseClaims(String token) {
// //         if (token.startsWith("Bearer ")) {
// //             token = token.substring(7); // remove Bearer prefix
// //         }

// //         return Jwts.parserBuilder()
// //                 .setSigningKey(secretKey)
// //                 .build()
// //                 .parseClaimsJws(token)
// //                 .getBody();
// //     }
// // }


// package com.example.javaapi.utils;

// import io.jsonwebtoken.*;
// import io.jsonwebtoken.security.Keys;
// import jakarta.annotation.PostConstruct;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Component;

// import javax.crypto.SecretKey;
// import java.util.Base64;
// import java.util.Date;

// @Component
// public class JwtUtil {

//     @Value("${jwt.secret}")
//     private String secret;

//     @Value("${jwt.expiration}")
//     private long expirationMs;

//     private SecretKey secretKey;

//     @PostConstruct
//     public void init() {
//         byte[] decodedKey = Base64.getDecoder().decode(secret);
//         if (decodedKey.length < 64) {
//             throw new IllegalArgumentException("JWT secret must be at least 512 bits (64 bytes) after Base64 decoding.");
//         }
//         this.secretKey = Keys.hmacShaKeyFor(decodedKey);
//     }

//     public String generateToken(String username, String role) {
//         return Jwts.builder()
//                 .setSubject(username)
//                 .claim("role", role)
//                 .setIssuedAt(new Date())
//                 .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
//                 .signWith(secretKey, SignatureAlgorithm.HS512)
//                 .compact();
//     }

//     public String extractUsername(String token) {
//         return parseClaims(token).getSubject();
//     }

//     public String extractRole(String token) {
//         return parseClaims(token).get("role", String.class);
//     }

//     public boolean validateToken(String token) {
//         try {
//             parseClaims(token);
//             return true;
//         } catch (JwtException e) {
//             System.out.println("Invalid JWT: " + e.getMessage());
//             return false;
//         }
//     }

//     private Claims parseClaims(String token) {
//         if (token.startsWith("Bearer ")) {
//             token = token.substring(7);
//         }
//         return Jwts.parserBuilder()
//                 .setSigningKey(secretKey)
//                 .build()
//                 .parseClaimsJws(token)
//                 .getBody();
//     }
// }



package com.example.javaapi.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret:MyJwtSecretKey}")
    private String secret;

    @Value("${jwt.expiration:86400000}") // default 1 day
    private long jwtExpirationInMs;

    // Generate Secret Key
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    // ✅ Generate Token
    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationInMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    // ✅ Extract Username
    public String extractUsername(String token) {
        return getAllClaimsFromToken(token).getSubject();
    }

    // ✅ Extract Role
    public String extractRole(String token) {
        return getAllClaimsFromToken(token).get("role", String.class);
    }

    // ✅ Validate Token
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            System.out.println("Token expired: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.out.println("Unsupported JWT: " + e.getMessage());
        } catch (MalformedJwtException e) {
            System.out.println("Malformed JWT: " + e.getMessage());
        } catch (SecurityException e) {
            System.out.println("Invalid signature: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("Empty claims: " + e.getMessage());
        }
        return false;
    }

    // ✅ Get All Claims
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}

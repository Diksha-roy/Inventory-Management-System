// package com.example.javaapi.config;

// import com.example.javaapi.service.UserDetailsServiceImpl;
// import com.example.javaapi.utils.JwtUtil;
// import jakarta.servlet.*;
// import jakarta.servlet.http.*;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
// import org.springframework.stereotype.Component;
// import org.springframework.web.filter.OncePerRequestFilter;

// import java.io.IOException;

// @Component
// public class JwtAuthenticationFilter extends OncePerRequestFilter {

//     @Autowired private JwtUtil jwtUtil;
//     @Autowired private UserDetailsServiceImpl userDetailsService;

//     @Override
//     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
//                                     FilterChain filterChain) throws ServletException, IOException {

//         String header = request.getHeader("Authorization");
//         String token = null, username = null;

//         if (header != null && header.startsWith("Bearer ")) {
//             token = header.substring(7);
//             username = jwtUtil.extractUsername(token);
//         }

//         if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//             var userDetails = userDetailsService.loadUserByUsername(username);
//             if (jwtUtil.validateToken(token)) {
//                 var auth = new UsernamePasswordAuthenticationToken(
//                         userDetails, null, userDetails.getAuthorities()
//                 );
//                 auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                 SecurityContextHolder.getContext().setAuthentication(auth);
//             }
//         }

//         filterChain.doFilter(request, response);
//     }
// }


package com.example.javaapi.config;

import com.example.javaapi.service.UserDetailsServiceImpl;
import com.example.javaapi.utils.JwtUtil;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired private JwtUtil jwtUtil;
    @Autowired private UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        String token = null, username = null;

        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
            username = jwtUtil.extractUsername(token);
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            var userDetails = userDetailsService.loadUserByUsername(username);
            if (jwtUtil.validateToken(token)) {
                // ✅ Add role from JWT claim and set it as authority
                String role = jwtUtil.extractRole(token);
                var authorities = Collections.singletonList(new SimpleGrantedAuthority(role));

                var auth = new UsernamePasswordAuthenticationToken(
                        userDetails, null, authorities
                );
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        filterChain.doFilter(request, response);
    }
}

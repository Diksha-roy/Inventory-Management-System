// package com.example.javaapi.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.*;

// @Configuration
// public class WebConfig {

//     @Bean
//     public WebMvcConfigurer corsConfigurer() {
//         return new WebMvcConfigurer() {
//             @Override
//             public void addCorsMappings(CorsRegistry registry) {
//                 registry.addMapping("/api/**")  // 🔁 Allow all /api/* endpoints
//                         .allowedOrigins("http://localhost:3000", "http://localhost:3001")  // 🔓 React Dev Server
//                         .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                         .allowedHeaders("*");
//             }
//         };
//     }
// }




import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

// @Configuration
// public class WebConfig {

//     @Bean
//     public WebMvcConfigurer corsConfigurer() {
//         return new WebMvcConfigurer() {
//             @Override
//             public void addCorsMappings(CorsRegistry registry) {
//                 // registry.addMapping("/api/**")  // 🔁 Allow all /api/* endpoints
//                 registry.addMapping("/**")
//                         .allowedOrigins("http://localhost:3001")  // 🔓 React Dev Server
//                         .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                         .allowedHeaders("*");
//             }
//         };
//     }
// }


@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT","PATCH", "DELETE", "OPTIONS")
                        .allowedHeaders("Authorization", "Content-Type", "Accept") 
                        .allowCredentials(true); 
            }
        };
    }
}


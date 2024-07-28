////package com.example.backend;
////
////import org.springframework.context.annotation.Bean;
////import org.springframework.context.annotation.Configuration;
////import org.springframework.security.config.annotation.web.builders.HttpSecurity;
////import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
////import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
////import org.springframework.security.config.http.SessionCreationPolicy;
////import org.springframework.security.web.SecurityFilterChain;
////
////@Configuration
////@EnableWebSecurity
////public class SecurityConfig {
////
////    @Bean
////    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
////        http
////                .csrf(csrf -> csrf.disable()) // Disable CSRF for stateless auth
////                .authorizeHttpRequests(requests -> requests
////                        .requestMatchers("/auth/register", "/auth/login").permitAll() // Allow registration and login without authentication
////                        .anyRequest().authenticated() // Require authentication for other endpoints
////                )
////                .sessionManagement(session -> session
////                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Stateless session
////                )
////                .formLogin(form -> form
////                        .loginPage("/auth/login") // URL for the login page
////                        .loginProcessingUrl("/auth/login") // URL for login form submission
////                        .usernameParameter("username")
////                        .passwordParameter("password")
////                        .defaultSuccessUrl("/api/events", true) // Redirect after successful login
////                        .failureUrl("/auth/login?error=true") // Redirect after failed login
////                        .permitAll()
////                )
////                .logout(logout -> logout
////                        .logoutUrl("/auth/logout")
////                        .logoutSuccessUrl("/auth/login?logout=true") // Redirect after successful logout
////                        .permitAll()
////                )
////                .sessionManagement(session -> session
////                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Ensure stateless session
////                );
////
////        return http.build();
////    }
////
////    @Bean
////    public WebSecurityCustomizer webSecurityCustomizer() {
////        return (web) -> web.ignoring().requestMatchers("/css/**", "/images/**", "/favicon.ico");
////    }
////}
//package com.example.backend;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf(csrf -> csrf.disable()) // Disable CSRF for stateless auth (optional, can be enabled if needed)
//                .authorizeHttpRequests(requests -> requests
//                        .requestMatchers("/auth/register", "/auth/login", "/auth/logout").permitAll() // Allow access to auth endpoints without authentication
//                        .anyRequest().authenticated() // Require authentication for all other endpoints
//                )
//                .sessionManagement(session -> session
//                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) // Use HTTP sessions for authentication
//                )
//                .formLogin(form -> form
//                        .loginPage("/auth/login") // URL for the login page
//                        .loginProcessingUrl("/auth/login") // URL to submit the login form
//                        .usernameParameter("username")
//                        .passwordParameter("password")
//                        .defaultSuccessUrl("/api/events", true) // Redirect after successful login
//                        .failureUrl("/auth/login?error=true") // Redirect after failed login
//                        .permitAll() // Allow all users to access the login page
//                )
//                .logout(logout -> logout
//                        .logoutUrl("/auth/logout") // URL to trigger logout
//                        .logoutSuccessUrl("/auth/login?logout=true") // Redirect after successful logout
//                        .permitAll() // Allow all users to access logout
//                );
//
//        return http.build();
//    }
//
//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() {
//        return (web) -> web.ignoring().requestMatchers("/css/**", "/images/**", "/favicon.ico"); // Ignore static resources
//    }
//}
